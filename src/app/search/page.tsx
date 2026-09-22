import Link from "next/link";
import { prisma } from "@/src/lib/db";
import { DashboardSearch } from "@/src/components/dashboard-search";

export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
  const params = await searchParams;
  const query = params.q?.trim() || "";
  let stories: any[] = [];
  let categories: any[] = [];
  try {
    categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
    stories = await prisma.story.findMany({ where: { ...(params.category ? { primaryCategory: { slug: params.category } } : {}), ...(query ? { OR: [{ headline: { contains: query, mode: "insensitive" } }, { summary: { contains: query, mode: "insensitive" } }, { articles: { some: { OR: [{ title: { contains: query, mode: "insensitive" } }, { source: { name: { contains: query, mode: "insensitive" } } }] } } }] } : {}) }, include: { primaryCategory: true, storySources: { include: { source: true } } }, orderBy: [{ importanceScore: "desc" }, { lastUpdatedAt: "desc" }], take: 50 });
  } catch { /* The home page explains database setup if unavailable. */ }
  return <div className="app-shell"><header className="topbar"><Link className="brand" href="/"><span className="brand-mark">NI</span><span><span className="brand-name">News Intelligence</span><span className="brand-sub">Search the reporting graph</span></span></Link><DashboardSearch /><div className="top-actions"><Link className="outline-button" href="/">Dashboard</Link></div></header><main className="main"><div className="page-heading"><div><div className="eyebrow">Search</div><h1>{query ? `Results for “${query}”` : "Explore the news"}</h1><p>Search across grouped stories, article titles, and source names. Category filters are applied before ranking.</p></div></div><nav className="topic-strip"><Link className={`topic-pill ${!params.category ? "active" : ""}`} href={query ? `/search?q=${encodeURIComponent(query)}` : "/search"}>All topics</Link>{categories.map((category) => <Link className={`topic-pill ${params.category === category.slug ? "active" : ""}`} key={category.id} href={`/search?category=${category.slug}${query ? `&q=${encodeURIComponent(query)}` : ""}`}>{category.name}</Link>)}</nav>{stories.length ? <div className="story-grid">{stories.map((story) => <Link href={`/stories/${story.id}`} className="story-card" key={story.id}><div className="story-meta"><span className="story-category">{story.primaryCategory.name}</span><span>·</span><span>{story.storySources.length} source{story.storySources.length === 1 ? "" : "s"}</span></div><h3>{story.headline}</h3><p className="story-description">{story.summary || "Summary pending."}</p><div className="story-footer"><span className="story-source">Open story details</span><span className="confidence">{story.confidence}</span></div></Link>)}</div> : <div className="empty-state">No matching stories. Try a broader phrase or run ingestion to collect more sources.</div>}</main></div>;
}
