import Link from "next/link";
import { prisma } from "@/src/lib/db";

export const dynamic = "force-dynamic";

export default async function TimelinePage() {
  let stories: any[] = [];
  try { stories = await prisma.story.findMany({ include: { primaryCategory: true, storySources: { include: { source: true } } }, orderBy: { lastUpdatedAt: "desc" }, take: 60 }); } catch {}
  const grouped = stories.reduce<Record<string, typeof stories>>((groups, story) => { const age = (Date.now() - story.lastUpdatedAt.getTime()) / 86_400_000; const key = age < 1 ? "Today" : age < 2 ? "Yesterday" : "This week"; (groups[key] ||= []).push(story); return groups; }, {});
  return <div className="app-shell"><header className="topbar"><Link className="brand" href="/"><span className="brand-mark">NI</span><span><span className="brand-name">News Intelligence</span><span className="brand-sub">Chronological view</span></span></Link><div className="top-actions"><Link className="outline-button" href="/">Dashboard</Link></div></header><main className="main"><div className="page-heading"><div><div className="eyebrow">News timeline</div><h1>What changed?</h1><p>Chronological coverage across your collected sources. Filtered categories can be added as the app grows.</p></div></div>{["Today", "Yesterday", "This week"].map((group) => <section key={group}><div className="section-head"><h2>{group}</h2></div>{grouped[group]?.length ? <div className="story-grid">{grouped[group].map((story) => <Link href={`/stories/${story.id}`} className="story-card" key={story.id}><div className="story-meta"><span className="story-category">{story.primaryCategory.name}</span><span>·</span><span>{new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(story.lastUpdatedAt)}</span></div><h3>{story.headline}</h3><p className="story-description">{story.summary || "Summary pending."}</p><div className="story-footer"><span className="story-source">{story.storySources.length} linked source{story.storySources.length === 1 ? "" : "s"}</span></div></Link>)}</div> : <div className="empty-state">No stories in this window.</div>}</section>)}</main></div>;
}
