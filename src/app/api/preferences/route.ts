import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/db";
import { z } from "zod";

const schema = z.object({ topics: z.array(z.string()).default([]), countries: z.array(z.string()).default([]), companies: z.array(z.string()).default([]), people: z.array(z.string()).default([]), keywords: z.array(z.string()).default([]), hiddenTopics: z.array(z.string()).default([]), sourceIds: z.array(z.string()).default([]) });

export async function POST(request: Request) {
  const body = schema.parse(await request.json());
  const user = await prisma.user.findFirst() ?? await prisma.user.create({ data: { email: "demo@news-intelligence.local", name: "Demo Reader" } });
  const preference = await prisma.userPreference.upsert({ where: { userId: user.id }, update: body, create: { userId: user.id, ...body } });
  return NextResponse.json(preference);
}

export async function GET() { const preference = await prisma.userPreference.findFirst(); return NextResponse.json(preference); }
