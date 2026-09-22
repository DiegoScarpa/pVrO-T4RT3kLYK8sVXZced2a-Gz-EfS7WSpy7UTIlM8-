import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() || "";
  if (!q) return NextResponse.json([]);
  const stories = await prisma.story.findMany({ where: { OR: [{ headline: { contains: q, mode: "insensitive" } }, { summary: { contains: q, mode: "insensitive" } }, { articles: { some: { OR: [{ title: { contains: q, mode: "insensitive" } }, { source: { name: { contains: q, mode: "insensitive" } } }] } } }] }, include: { primaryCategory: true, storySources: { include: { source: true } } }, orderBy: [{ importanceScore: "desc" }, { lastUpdatedAt: "desc" }], take: 50 });
  return NextResponse.json(stories);
}
