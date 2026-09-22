import { createHash } from "node:crypto";

export function stripHtml(value = "") {
  return value.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}

export function canonicalizeUrl(rawUrl: string) {
  try {
    const url = new URL(rawUrl);
    url.hash = "";
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "ref", "source"].forEach((key) => url.searchParams.delete(key));
    return url.toString().replace(/\/$/, "");
  } catch {
    return rawUrl.trim();
  }
}

export function normalizeTitle(title: string) {
  return stripHtml(title).toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

export function fingerprint(title: string, description = "") {
  return createHash("sha256").update(`${normalizeTitle(title)}|${stripHtml(description).toLowerCase().slice(0, 500)}`).digest("hex");
}

export function tokenSet(value: string) {
  return new Set(normalizeTitle(value).split(" ").filter((token) => token.length > 2));
}

export function jaccardSimilarity(left: string, right: string) {
  const a = tokenSet(left);
  const b = tokenSet(right);
  if (!a.size || !b.size) return 0;
  const intersection = [...a].filter((token) => b.has(token)).length;
  return intersection / new Set([...a, ...b]).size;
}

export function slugify(value: string) {
  return normalizeTitle(value).replace(/\s+/g, "-").slice(0, 90);
}

export function safeDate(value?: string | Date | null) {
  if (!value) return null;
  const parsed = value instanceof Date ? value : new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function hoursSince(date?: Date | null) {
  if (!date) return 999;
  return Math.max(0, (Date.now() - date.getTime()) / 3_600_000);
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
