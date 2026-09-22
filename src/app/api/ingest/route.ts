import { NextResponse } from "next/server";
import { ingestNews } from "@/src/lib/news/ingest";

function authorized(request: Request) { return process.env.NODE_ENV !== "production" || request.headers.get("x-ingestion-secret") === process.env.INGESTION_SECRET; }

export async function POST(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try { return NextResponse.json(await ingestNews()); } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Ingestion failed" }, { status: 500 }); }
}
