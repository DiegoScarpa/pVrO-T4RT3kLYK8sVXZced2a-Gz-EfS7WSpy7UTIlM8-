import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/db";

export async function GET() { return NextResponse.json(await prisma.category.findMany({ orderBy: { sortOrder: "asc" } })); }
