import OpenAI from "openai";

const client = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

export type StoryInput = { title: string; source: string; publishedAt?: string | null; description?: string | null; content?: string | null; url: string };

export type StorySummary = {
  headline: string;
  summary: string;
  whyItMatters: string;
  keyFacts: string[];
  whatHappensNext: string;
  confidence: "Confirmed" | "Reported" | "Developing" | "Unclear";
};

export async function summarizeStory(stories: StoryInput[]): Promise<StorySummary | null> {
  if (!client || stories.length === 0) return null;
  const sourcePacket = stories.map((story, index) => `SOURCE ${index + 1}: ${story.source}\nURL: ${story.url}\nDATE: ${story.publishedAt ?? "unknown"}\nTITLE: ${story.title}\nDESCRIPTION: ${story.description ?? ""}\nCONTENT: ${(story.content ?? "").slice(0, 3500)}`).join("\n\n");
  const response = await client.chat.completions.create({
    model: process.env.AI_SUMMARY_MODEL || "gpt-4o-mini",
    temperature: 0.1,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: "You are a careful news editor. Use only the supplied source packet. Do not invent facts, quotations, statistics, dates, or events. If sources disagree, say so. Separate facts from analysis. Return valid JSON with keys headline, summary, whyItMatters, keyFacts (array of 3-5 strings), whatHappensNext, confidence (Confirmed, Reported, Developing, or Unclear). Keep summary to 2-4 sentences and whyItMatters to 1-3 sentences. If next steps are not supported, say that no clear next step is reported." },
      { role: "user", content: sourcePacket },
    ],
  });
  const content = response.choices[0]?.message.content;
  if (!content) return null;
  try {
    const parsed = JSON.parse(content) as StorySummary;
    return {
      headline: parsed.headline || stories[0].title,
      summary: parsed.summary || "The supplied sources do not contain enough information for a reliable summary.",
      whyItMatters: parsed.whyItMatters || "The significance is not clear from the supplied sources.",
      keyFacts: Array.isArray(parsed.keyFacts) ? parsed.keyFacts.slice(0, 5) : [],
      whatHappensNext: parsed.whatHappensNext || "No clear next step is reported.",
      confidence: ["Confirmed", "Reported", "Developing", "Unclear"].includes(parsed.confidence) ? parsed.confidence : "Unclear",
    };
  } catch {
    return null;
  }
}

export function whyShouldICare(story: { headline: string; summary?: string | null }, preferences: { topics: string[]; companies: string[]; keywords: string[] }) {
  const interests = [...preferences.topics, ...preferences.companies, ...preferences.keywords].filter(Boolean);
  if (!interests.length) return "Select topics, companies, or keywords to personalize this explanation.";
  return `This may matter to you because it connects to your selected interests: ${interests.slice(0, 5).join(", ")}. Review the linked sources for the details most relevant to your priorities.`;
}
