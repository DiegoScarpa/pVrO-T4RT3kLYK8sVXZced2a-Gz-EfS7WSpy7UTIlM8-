import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/db";

export async function GET() {
  const user = await prisma.user.findFirst({ include: { preference: true } });
  const stories = await prisma.story.findMany({ where: { summary: { not: null } }, include: { primaryCategory: true, storySources: { include: { source: true } } }, orderBy: [{ importanceScore: "desc" }, { lastUpdatedAt: "desc" }], take: 20 });
  return NextResponse.json({ user, stories });
}
