import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/db";
import { refreshStory } from "@/src/lib/news/ingest";

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production" && request.headers.get("x-ingestion-secret") !== process.env.INGESTION_SECRET) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const stories = body.storyId ? [body.storyId] : (await prisma.story.findMany({ where: { summary: null }, orderBy: { importanceScore: "desc" }, take: 20 })).map((story) => story.id);
  const results = [];
  for (const storyId of stories) results.push(await refreshStory(storyId));
  return NextResponse.json({ processed: results.length });
}
