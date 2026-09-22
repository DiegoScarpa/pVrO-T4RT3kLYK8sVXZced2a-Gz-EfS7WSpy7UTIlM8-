import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/db";

export async function GET() {
  const [sources, latestRun, articles, stories] = await Promise.all([prisma.source.findMany({ include: { category: true }, orderBy: { name: "asc" } }), prisma.ingestionRun.findFirst({ orderBy: { startedAt: "desc" } }), prisma.article.count(), prisma.story.count()]);
  return NextResponse.json({ sources, latestRun, counts: { articles, stories } });
}
