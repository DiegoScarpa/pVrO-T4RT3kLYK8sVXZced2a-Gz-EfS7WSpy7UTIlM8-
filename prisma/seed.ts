import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  ["world", "World"], ["united-states", "United States"], ["politics", "Politics"],
  ["business", "Business"], ["economy", "Economy"], ["financial-markets", "Financial Markets"],
  ["ai", "AI"], ["technology", "Technology"], ["startups", "Startups"], ["science", "Science"],
  ["energy", "Energy"], ["climate", "Climate"], ["healthcare", "Healthcare"], ["education", "Education"],
  ["sports", "Sports"], ["gaming", "Gaming"], ["entertainment", "Entertainment"], ["travel", "Travel"],
  ["cybersecurity", "Cybersecurity"], ["space", "Space"],
] as const;

const sources = [
  { name: "BBC World", url: "https://feeds.bbci.co.uk/news/world/rss.xml", category: "world", country: "GB", credibility: 0.88 },
  { name: "NPR News", url: "https://feeds.npr.org/1001/rss.xml", category: "united-states", country: "US", credibility: 0.86 },
  { name: "BBC Business", url: "https://feeds.bbci.co.uk/news/business/rss.xml", category: "business", country: "GB", credibility: 0.88 },
  { name: "Dow Jones Markets", url: "https://feeds.a.dj.com/rss/RSSMarketsMain.xml", category: "financial-markets", country: "US", credibility: 0.86 },
  { name: "The Verge", url: "https://www.theverge.com/rss/index.xml", category: "technology", country: "US", credibility: 0.8 },
  { name: "TechCrunch", url: "https://techcrunch.com/feed/", category: "startups", country: "US", credibility: 0.8 },
  { name: "Ars Technica", url: "https://feeds.arstechnica.com/arstechnica/index", category: "science", country: "US", credibility: 0.84 },
  { name: "NASA Breaking News", url: "https://www.nasa.gov/rss/dyn/breaking_news.rss", category: "space", country: "US", credibility: 0.95 },
];

const sampleStories = [
  {
    headline: "A calmer way to read the news: context over volume",
    summary: "News Intelligence groups reporting about the same event into one story, then presents the most useful context first. The seeded story demonstrates the shape of the daily briefing before live sources are connected.",
    whyItMatters: "A clear distinction between what is known, what is reported, and what remains uncertain helps readers make better decisions without mistaking volume for importance.",
    keyFacts: ["Stories combine multiple articles covering the same event.", "Original sources remain visible and linkable.", "AI summaries are generated only when source context is available."],
    whatHappensNext: "Run the ingestion command to replace or expand the sample briefing with live RSS stories.",
    confidence: "Confirmed",
    importanceScore: 95,
    category: "technology",
  },
];

async function main() {
  for (const [index, [slug, name]] of categories.entries()) {
    await prisma.category.upsert({
      where: { slug },
      update: { name, sortOrder: index },
      create: { slug, name, sortOrder: index, description: `${name} reporting and analysis.` },
    });
  }

  for (const source of sources) {
    const category = await prisma.category.findUniqueOrThrow({ where: { slug: source.category } });
    await prisma.source.upsert({
      where: { url: source.url },
      update: { name: source.name, categoryId: category.id, country: source.country, credibility: source.credibility, enabled: true },
      create: { name: source.name, url: source.url, categoryId: category.id, country: source.country, credibility: source.credibility, metadata: { kind: "rss", verified: true } },
    });
  }

  const user = await prisma.user.upsert({
    where: { email: "demo@news-intelligence.local" },
    update: {},
    create: { email: "demo@news-intelligence.local", name: "Demo Reader" },
  });

  await prisma.userPreference.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      topics: ["ai", "business", "economy", "technology", "startups", "financial-markets"],
      countries: ["US", "GB"], companies: ["OpenAI", "NVIDIA"], people: [],
      keywords: ["interest rates", "semiconductors"], hiddenTopics: ["celebrity"], sourceIds: [],
    },
  });

  for (const sample of sampleStories) {
    const category = await prisma.category.findUniqueOrThrow({ where: { slug: sample.category } });
    const source = await prisma.source.findFirstOrThrow({ where: { categoryId: category.id } });
    const url = "https://news-intelligence.local/sample/context-over-volume";
    const article = await prisma.article.upsert({
      where: { canonicalUrl: url },
      update: {},
      create: {
        title: sample.headline, url, canonicalUrl: url, sourceId: source.id,
        publishedAt: new Date(), description: sample.summary, categoryId: category.id,
        tags: ["news literacy", "context"], fingerprint: "sample-context-over-volume",
      },
    });
    const story = await prisma.story.upsert({
      where: { id: "sample-story-context-over-volume" },
      update: { headline: sample.headline, summary: sample.summary, whyItMatters: sample.whyItMatters, keyFacts: sample.keyFacts, whatHappensNext: sample.whatHappensNext, confidence: sample.confidence, importanceScore: sample.importanceScore, primaryCategoryId: category.id, lastUpdatedAt: new Date() },
      create: { id: "sample-story-context-over-volume", headline: sample.headline, summary: sample.summary, whyItMatters: sample.whyItMatters, keyFacts: sample.keyFacts, whatHappensNext: sample.whatHappensNext, confidence: sample.confidence, importanceScore: sample.importanceScore, primaryCategoryId: category.id },
    });
    await prisma.article.update({ where: { id: article.id }, data: { storyId: story.id } });
    await prisma.storySource.upsert({ where: { storyId_articleId: { storyId: story.id, articleId: article.id } }, update: { sourceId: source.id }, create: { storyId: story.id, articleId: article.id, sourceId: source.id } });
  }

  console.log(`Seeded ${categories.length} categories, ${sources.length} sources, and demo data.`);
}

main().finally(() => prisma.$disconnect());
