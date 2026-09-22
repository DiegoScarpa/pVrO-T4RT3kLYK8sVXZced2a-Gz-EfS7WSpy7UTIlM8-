import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/db";

export async function GET() { return NextResponse.json(await prisma.source.findMany({ include: { category: true }, orderBy: { name: "asc" } })); }
