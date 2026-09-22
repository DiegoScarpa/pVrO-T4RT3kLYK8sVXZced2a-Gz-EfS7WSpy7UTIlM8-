import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/db";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const story = await prisma.story.findUnique({ where: { id }, include: { primaryCategory: true, articles: { include: { source: true }, orderBy: { publishedAt: "desc" } }, storySources: { include: { source: true } } } });
  return story ? NextResponse.json(story) : NextResponse.json({ error: "Story not found" }, { status: 404 });
}
