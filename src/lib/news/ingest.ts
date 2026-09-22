import Parser from "rss-parser";
import { prisma } from "@/src/lib/db";
import { summarizeStory } from "@/src/lib/ai";
import { classifyCategory, extractTags } from "@/src/lib/news/classify";
import { areDuplicateArticles, shouldJoinStory } from "@/src/lib/news/dedupe";
import { calculateImportance } from "@/src/lib/news/importance";
import { canonicalizeUrl, fingerprint, safeDate, stripHtml } from "@/src/lib/utils";
import { getEnabledSources, updateSourceHealth } from "@/src/lib/news/sources";

const parser = new Parser({ timeout: 15_000 });

type FeedItem = Parser.Item & { "media:content"?: { $?: { url?: string } }; enclosure?: { url?: string } };

async function fetchFeed(url: string) {
  const response = await fetch(url, { headers: { "user-agent": "NewsIntelligence/0.1 RSS reader" }, signal: AbortSignal.timeout(15_000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return parser.parseString(await response.text());
}

export async function ingestNews() {
  const run = await prisma.ingestionRun.create({ data: { errors: [] } });
  const errors: string[] = [];
  let articlesFetched = 0;
  let articlesUpserted = 0;
  let storiesCreated = 0;
  try {
    const sources = await getEnabledSources();
    for (const source of sources) {
      try {
        const feed = await fetchFeed(source.url);
        for (const item of (feed.items as FeedItem[]).slice(0, 50)) {
          articlesFetched += 1;
          const rawUrl = item.link || item.guid;
          if (!rawUrl || !item.title) continue;
          const url = canonicalizeUrl(rawUrl);
          const description = stripHtml(item.contentSnippet || item.content || item.summary || "");
          const title = stripHtml(item.title);
          const publishedAt = safeDate(item.isoDate || item.pubDate);
          const categorySlug = classifyCategory(title, description, source.category.slug);
          const category = await prisma.category.findUnique({ where: { slug: categorySlug } }) ?? source.category;
          const imageUrl = item.enclosure?.url || item["media:content"]?.$?.url || null;
          const existing = await prisma.article.findUnique({ where: { canonicalUrl: url } });
          const feedAuthor = (item as FeedItem & { author?: string }).author;
          const article = existing
            ? await prisma.article.update({ where: { id: existing.id }, data: { title, description, publishedAt, imageUrl, retrievedAt: new Date() } })
            : await prisma.article.create({ data: { title, url: rawUrl, canonicalUrl: url, sourceId: source.id, author: item.creator || feedAuthor || null, publishedAt, description, imageUrl, categoryId: category.id, tags: extractTags(title, description), fingerprint: fingerprint(title, description) } });
          articlesUpserted += existing ? 0 : 1;

          const nearby = await prisma.article.findMany({ where: { categoryId: category.id, id: { not: article.id }, publishedAt: publishedAt ? { gte: new Date(publishedAt.getTime() - 5 * 86_400_000) } : undefined }, orderBy: { publishedAt: "desc" }, take: 40, include: { story: true } });
          const duplicate = nearby.find((candidate) => areDuplicateArticles({ title, canonicalUrl: url }, { title: candidate.title, canonicalUrl: candidate.canonicalUrl }));
          if (duplicate?.storyId) {
            await prisma.article.update({ where: { id: article.id }, data: { storyId: duplicate.storyId } });
            await prisma.storySource.upsert({ where: { storyId_articleId: { storyId: duplicate.storyId, articleId: article.id } }, update: { sourceId: source.id }, create: { storyId: duplicate.storyId, articleId: article.id, sourceId: source.id } });
            continue;
          }
          const cluster = nearby.find((candidate) => candidate.story && shouldJoinStory({ title, publishedAt }, { title: candidate.title, publishedAt: candidate.publishedAt }));
          if (cluster?.story) {
            await prisma.article.update({ where: { id: article.id }, data: { storyId: cluster.story.id } });
            await prisma.storySource.upsert({ where: { storyId_articleId: { storyId: cluster.story.id, articleId: article.id } }, update: { sourceId: source.id }, create: { storyId: cluster.story.id, articleId: article.id, sourceId: source.id } });
            await refreshStory(cluster.story.id);
            continue;
          }
          const story = await prisma.story.create({ data: { headline: title, primaryCategoryId: category.id, keyFacts: [], confidence: "Reported", importanceScore: calculateImportance({ sourceCount: 1, sources: [{ credibility: source.credibility }], publishedAt }), lastUpdatedAt: publishedAt ?? new Date() } });
          storiesCreated += 1;
          await prisma.article.update({ where: { id: article.id }, data: { storyId: story.id } });
          await prisma.storySource.create({ data: { storyId: story.id, articleId: article.id, sourceId: source.id } });
          await refreshStory(story.id);
        }
        await updateSourceHealth(source.id, true);
      } catch (error) {
        const message = `${source.name}: ${error instanceof Error ? error.message : "unknown error"}`;
        errors.push(message);
        await updateSourceHealth(source.id, false, message);
      }
    }
    await prisma.ingestionRun.update({ where: { id: run.id }, data: { status: "completed", completedAt: new Date(), articlesFetched, articlesUpserted, storiesCreated, errors } });
    return { runId: run.id, status: "completed", articlesFetched, articlesUpserted, storiesCreated, errors };
  } catch (error) {
    errors.push(error instanceof Error ? error.message : "Unknown ingestion error");
    await prisma.ingestionRun.update({ where: { id: run.id }, data: { status: "failed", completedAt: new Date(), articlesFetched, articlesUpserted, storiesCreated, errors } });
    throw error;
  }
}

export async function refreshStory(storyId: string) {
  const story = await prisma.story.findUnique({ where: { id: storyId }, include: { articles: { include: { source: true }, orderBy: { publishedAt: "desc" } }, storySources: { include: { source: true } } } });
  if (!story) return null;
  const sources = story.articles.map((article) => ({ title: article.title, source: article.source.name, publishedAt: article.publishedAt?.toISOString(), description: article.description, content: article.content, url: article.url }));
  const summary = story.summary ? null : await summarizeStory(sources);
  const sourceRecords = story.storySources.map((entry) => ({ credibility: entry.source.credibility }));
  return prisma.story.update({ where: { id: storyId }, data: {
    ...(summary ? { headline: summary.headline, summary: summary.summary, whyItMatters: summary.whyItMatters, keyFacts: summary.keyFacts, whatHappensNext: summary.whatHappensNext, confidence: summary.confidence } : {}),
    importanceScore: calculateImportance({ sourceCount: Math.max(1, story.storySources.length), sources: sourceRecords, publishedAt: story.lastUpdatedAt }),
    lastUpdatedAt: new Date(),
  } });
}
