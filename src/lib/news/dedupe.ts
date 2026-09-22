import { jaccardSimilarity, normalizeTitle } from "@/src/lib/utils";

export function areDuplicateArticles(left: { title: string; canonicalUrl?: string }, right: { title: string; canonicalUrl?: string }) {
  if (left.canonicalUrl && right.canonicalUrl && left.canonicalUrl === right.canonicalUrl) return true;
  const a = normalizeTitle(left.title);
  const b = normalizeTitle(right.title);
  return a === b || jaccardSimilarity(a, b) >= 0.5;
}

export function shouldJoinStory(left: { title: string; publishedAt?: Date | null }, right: { title: string; publishedAt?: Date | null }) {
  if (left.publishedAt && right.publishedAt && Math.abs(left.publishedAt.getTime() - right.publishedAt.getTime()) > 5 * 86_400_000) return false;
  return jaccardSimilarity(left.title, right.title) >= 0.42;
}
