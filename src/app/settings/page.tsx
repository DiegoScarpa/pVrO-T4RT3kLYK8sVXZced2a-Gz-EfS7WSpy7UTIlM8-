import Link from "next/link";
import { prisma } from "@/src/lib/db";
import { PreferencesForm } from "@/src/components/preferences-form";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  let categories: Awaited<ReturnType<typeof prisma.category.findMany>> = [];
  let preference: Awaited<ReturnType<typeof prisma.userPreference.findFirst>> = null;
  try { [categories, preference] = await Promise.all([prisma.category.findMany({ orderBy: { sortOrder: "asc" } }), prisma.userPreference.findFirst()]); } catch {}
  const selected = Array.isArray(preference?.topics) ? preference.topics as string[] : ["ai", "business", "economy", "technology", "startups", "financial-markets"];
  return <div className="app-shell"><header className="topbar"><Link className="brand" href="/"><span className="brand-mark">NI</span><span><span className="brand-name">News Intelligence</span><span className="brand-sub">Personalization</span></span></Link><div className="top-actions"><Link className="outline-button" href="/">Dashboard</Link></div></header><main className="main"><div className="page-heading"><div><div className="eyebrow">Preferences</div><h1>Tune your signal.</h1><p>Choose the topics and entities that shape ordering and the personalized “why should I care?” context.</p></div></div><PreferencesForm categories={categories.map((category) => ({ slug: category.slug, name: category.name }))} selected={selected} keywords={Array.isArray(preference?.keywords) ? preference.keywords as string[] : ["interest rates", "semiconductors"]} companies={Array.isArray(preference?.companies) ? preference.companies as string[] : ["OpenAI", "NVIDIA"]} /></main></div>;
}
