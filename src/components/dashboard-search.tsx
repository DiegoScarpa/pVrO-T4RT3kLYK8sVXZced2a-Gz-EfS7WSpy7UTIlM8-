"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function DashboardSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  function submit(event: FormEvent) { event.preventDefault(); if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`); }
  return <form className="search" onSubmit={submit}><span className="search-icon">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search stories, sources, companies, people…" aria-label="Search" /></form>;
}
