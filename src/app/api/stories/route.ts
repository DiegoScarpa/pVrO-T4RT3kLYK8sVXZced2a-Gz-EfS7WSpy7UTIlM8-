import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const limit = Math.min(Number(searchParams.get("limit") || 20), 100);
  const stories = await prisma.story.findMany({ where: { ...(category ? { primaryCategory: { slug: category } } : {}) }, include: { primaryCategory: true, storySources: { include: { source: true } } }, orderBy: [{ importanceScore: "desc" }, { lastUpdatedAt: "desc" }], take: limit });
  return NextResponse.json(stories);
}
