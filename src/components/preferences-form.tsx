"use client";

import { FormEvent, useState } from "react";

export function PreferencesForm({ categories, selected, keywords, companies }: { categories: { slug: string; name: string }[]; selected: string[]; keywords: string[]; companies: string[] }) {
  const [topics, setTopics] = useState(selected);
  const [keywordText, setKeywordText] = useState(keywords.join(", "));
  const [companyText, setCompanyText] = useState(companies.join(", "));
  const [saved, setSaved] = useState(false);
  function toggle(slug: string) { setTopics((current) => current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]); }
  async function submit(event: FormEvent) { event.preventDefault(); await fetch("/api/preferences", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ topics, keywords: keywordText.split(",").map((item) => item.trim()).filter(Boolean), companies: companyText.split(",").map((item) => item.trim()).filter(Boolean) }) }); setSaved(true); }
  return <form className="detail-panel" onSubmit={submit}><div className="form-stack"><div><label>Preferred topics</label><div className="interest-list" style={{marginTop: 8}}>{categories.map((category) => <button type="button" className={`topic-pill ${topics.includes(category.slug) ? "active" : ""}`} key={category.slug} onClick={() => toggle(category.slug)}>{category.name}</button>)}</div></div><div><label>Companies to follow<input value={companyText} onChange={(event) => setCompanyText(event.target.value)} placeholder="OpenAI, NVIDIA, Microsoft" /></label></div><div><label>Keywords<input value={keywordText} onChange={(event) => setKeywordText(event.target.value)} placeholder="interest rates, semiconductors" /></label></div><button className="primary-button" type="submit">Save preferences</button>{saved && <div className="notice" style={{margin: 0}}>Preferences saved. Your next briefing will use them.</div>}</div></form>;
}
