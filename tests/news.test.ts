import { describe, expect, it } from "vitest";
import { canonicalizeUrl, fingerprint, jaccardSimilarity, normalizeTitle } from "@/src/lib/utils";
import { areDuplicateArticles, shouldJoinStory } from "@/src/lib/news/dedupe";
import { classifyCategory, extractTags } from "@/src/lib/news/classify";
import { calculateImportance } from "@/src/lib/news/importance";

describe("news normalization", () => {
  it("canonicalizes tracking parameters and fragments", () => {
    expect(canonicalizeUrl("https://example.com/story/?utm_source=x&ref=home#comments")).toBe("https://example.com/story");
  });
  it("normalizes punctuation and whitespace", () => {
    expect(normalizeTitle("  Fed: Holds Rates Steady! ")).toBe("fed holds rates steady");
    expect(fingerprint("Same story", "Same facts")).toHaveLength(64);
  });
  it("calculates token similarity", () => expect(jaccardSimilarity("AI chip launch", "AI chip launches today")).toBeGreaterThan(0.2));
});

describe("deduplication and clustering", () => {
  it("detects exact and near duplicate titles", () => {
    expect(areDuplicateArticles({ title: "Fed holds rates steady", canonicalUrl: "https://a" }, { title: "Fed holds rates steady", canonicalUrl: "https://b" })).toBe(true);
    expect(areDuplicateArticles({ title: "Nvidia unveils new AI chip", canonicalUrl: "https://a" }, { title: "Nvidia unveils a new AI chip for data centers", canonicalUrl: "https://b" })).toBe(true);
  });
  it("keeps distant dates from joining a story", () => {
    expect(shouldJoinStory({ title: "Company announces launch", publishedAt: new Date("2026-09-01") }, { title: "Company announces launch", publishedAt: new Date("2026-09-20") })).toBe(false);
  });
});

describe("classification and importance", () => {
  it("classifies obvious topic signals and extracts tags", () => {
    expect(classifyCategory("OpenAI announces model update", "The artificial intelligence company released a new model", "business")).toBe("ai");
    expect(extractTags("OpenAI and NVIDIA discuss semiconductors", "Interest rates remain in focus")).toEqual(expect.arrayContaining(["OpenAI", "NVIDIA", "interest rates", "semiconductors"]));
  });
  it("raises ordering signal for fresh, multi-source, relevant reporting", () => {
    const score = calculateImportance({ sourceCount: 4, sources: [{ credibility: 0.9 }, { credibility: 0.8 }], publishedAt: new Date(), preferred: true, developing: true, majorChange: true });
    expect(score).toBeGreaterThan(80);
    expect(score).toBeLessThanOrEqual(100);
  });
});
