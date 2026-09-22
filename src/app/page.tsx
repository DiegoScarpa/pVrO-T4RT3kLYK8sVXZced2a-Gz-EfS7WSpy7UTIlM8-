import Link from "next/link";
import { prisma } from "@/src/lib/db";
import { DashboardSearch } from "@/src/components/dashboard-search";
import { IngestButton } from "@/src/components/ingest-button";

export const dynamic = "force-dynamic";

const demoTopics = ["AI", "Business", "Economy", "Technology", "Startups", "Markets"];

async function getDashboardData() {
  try {
    const [categories, stories, preference, latestRun] = await Promise.all([
      prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.story.findMany({ where: { summary: { not: null } }, include: { primaryCategory: true, storySources: { include: { source: true } }, articles: true }, orderBy: [{ importanceScore: "desc" }, { lastUpdatedAt: "desc" }], take: 12 }),
      prisma.userPreference.findFirst(),
      prisma.ingestionRun.findFirst({ orderBy: { startedAt: "desc" } }),
    ]);
    return { categories, stories, preference, latestRun, configured: true };
  } catch {
    return { categories: [], stories: [], preference: null, latestRun: null, configured: false };
  }
}

function formatDate(date: Date | null | undefined) {
  if (!date) return "Recently";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "numeric" }).format(date);
}

export default async function Home() {
  const { categories, stories, preference, latestRun, configured } = await getDashboardData();
  const interests = Array.isArray(preference?.topics) ? preference.topics as string[] : demoTopics.map((topic) => topic.toLowerCase());
  return <div className="app-shell">
    <header className="topbar">
      <Link className="brand" href="/"><span className="brand-mark">NI</span><span><span className="brand-name">News Intelligence</span><span className="brand-sub">A calmer daily briefing</span></span></Link>
      <DashboardSearch />
      <div className="top-actions"><Link className="outline-button" href="/briefing">Daily briefing</Link><Link className="icon-button" href="/settings" aria-label="Settings">⚙</Link></div>
    </header>
    <main className="main">
      {!configured && <div className="notice">The database is not connected yet. Copy <code>.env.example</code> to <code>.env</code>, set <code>DATABASE_URL</code>, then run <code>npm run db:push && npm run db:seed</code>.</div>}
      <nav className="topic-strip"><Link className="topic-pill active" href="/">For you</Link>{categories.slice(0, 12).map((category) => <Link className="topic-pill" key={category.id} href={`/search?category=${category.slug}`}>{category.name}</Link>)}</nav>
      <div className="page-heading"><div><div className="eyebrow">Saturday, September 20, 2026</div><h1>Good morning.</h1><p>Your briefing is tuned to the topics you selected. Stories are grouped by event, with uncertainty and source differences kept visible.</p></div><IngestButton /></div>
      <div className="layout-grid">
        <section>
          <div className="section-head"><h2>Top stories</h2><Link href="/timeline">View timeline →</Link></div>
          {stories.length ? <div className="story-grid">{stories.slice(0, 6).map((story, index) => <Link href={`/stories/${story.id}`} className={`story-card ${index === 0 ? "featured" : ""}`} key={story.id}><div className="story-meta"><span className="story-category">{story.primaryCategory.name}</span><span>·</span><span>{formatDate(story.lastUpdatedAt)}</span></div><h3>{story.headline}</h3><p className="story-description">{story.summary}</p><div className="story-footer"><span className="story-source">{story.storySources.length} source{story.storySources.length === 1 ? "" : "s"} · {story.articles.length} article{story.articles.length === 1 ? "" : "s"}</span><span className={`confidence ${story.confidence === "Developing" ? "developing" : ""}`}>{story.confidence}</span></div></Link>)}</div> : <div className="empty-state">No summarized stories yet. Seed the database for a demo story, then run ingestion to retrieve live RSS reporting.</div>}
          <div className="section-head"><h2>What changed</h2><Link href="/search">Search everything →</Link></div>
          <div className="side-card"><p style={{margin: 0}}>The briefing updates as new sources arrive. AI synthesis is cached at the story level, so multiple articles about the same event do not trigger repeated summaries.</p><div className="metric-row"><div className="metric"><strong>{stories.length}</strong><span>stories in view</span></div><div className="metric"><strong>{stories.reduce((sum, story) => sum + story.storySources.length, 0)}</strong><span>source links</span></div><div className="metric"><strong>{latestRun?.articlesUpserted ?? 0}</strong><span>latest articles</span></div></div></div>
        </section>
        <aside className="sidebar">
          <div className="side-card"><div className="eyebrow">Your signal</div><h3>Selected interests</h3><p>These topics shape the order of your briefing and the “why should I care?” context.</p><div className="interest-list">{interests.slice(0, 8).map((interest) => <span className="interest" key={interest}>{interest.replaceAll("-", " ")}</span>)}</div><Link className="outline-button" style={{display: "inline-block", marginTop: 17}} href="/settings">Tune preferences</Link></div>
          <div className="side-card briefing-callout"><div className="eyebrow">Daily briefing</div><h3>Context, not noise.</h3><p>Open the briefing to see sections for AI & technology, business & economy, markets, world, and the United States.</p><Link className="primary-button" style={{display: "inline-block"}} href="/briefing">Read briefing →</Link></div>
          <div className="side-card"><h3>System status</h3><p><span className={`status-dot ${latestRun?.status === "failed" ? "error" : ""}`}></span>{latestRun ? `${latestRun.status} · ${formatDate(latestRun.completedAt ?? latestRun.startedAt)}` : "Waiting for first ingestion"}</p><Link href="/status" className="back-link">Open status →</Link></div>
        </aside>
      </div>
    </main><div className="footer">News Intelligence · Source-transparent summaries · <Link href="/status">System status</Link></div>
  </div>;
}
