import { clamp, hoursSince } from "@/src/lib/utils";

export function calculateImportance(input: {
  sourceCount: number;
  sources: { credibility: number }[];
  publishedAt?: Date | null;
  preferred?: boolean;
  developing?: boolean;
  majorChange?: boolean;
}) {
  const sourceSignal = clamp(input.sourceCount / 5, 0, 1) * 26;
  const credibility = input.sources.length ? input.sources.reduce((sum, source) => sum + source.credibility, 0) / input.sources.length : 0.5;
  const recency = clamp(1 - hoursSince(input.publishedAt) / 72, 0, 1) * 22;
  const relevance = input.preferred ? 18 : 6;
  const developing = input.developing ? 15 : 0;
  const change = input.majorChange ? 12 : 0;
  return Math.round(clamp(12 + sourceSignal + credibility * 15 + recency + relevance + developing + change, 0, 100));
}
