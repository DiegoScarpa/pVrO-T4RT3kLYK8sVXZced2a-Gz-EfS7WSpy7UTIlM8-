import { prisma } from "@/src/lib/db";

export async function getEnabledSources() {
  return prisma.source.findMany({ include: { category: true }, where: { enabled: true }, orderBy: { name: "asc" } });
}

export async function updateSourceHealth(sourceId: string, ok: boolean, error?: string) {
  return prisma.source.update({
    where: { id: sourceId },
    data: ok
      ? { lastFetchedAt: new Date(), lastSuccessAt: new Date(), lastError: null, failureCount: 0 }
      : { lastFetchedAt: new Date(), lastError: error?.slice(0, 500) ?? "Unknown error", failureCount: { increment: 1 } },
  });
}
