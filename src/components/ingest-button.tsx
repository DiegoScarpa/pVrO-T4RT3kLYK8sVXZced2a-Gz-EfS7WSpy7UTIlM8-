"use client";

import { useState } from "react";

export function IngestButton() {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  async function run() { setState("loading"); await fetch("/api/ingest", { method: "POST" }); setState("done"); window.location.reload(); }
  return <button className="primary-button" onClick={run} disabled={state === "loading"}>{state === "loading" ? "Collecting…" : state === "done" ? "Updated" : "Run live ingestion"}</button>;
}
