const categoryKeywords: Record<string, string[]> = {
  ai: ["artificial intelligence", " ai ", "openai", "model", "machine learning", "nvidia"],
  technology: ["software", "technology", "tech", "apple", "google", "microsoft", "cloud", "internet"],
  startups: ["startup", "venture", "funding", "seed round", "founder"],
  business: ["company", "business", "earnings", "revenue", "deal", "merger", "acquisition"],
  economy: ["inflation", "economy", "jobs", "employment", "gdp", "central bank", "federal reserve"],
  "financial-markets": ["stock", "stocks", "market", "shares", "bond", "yield", "nasdaq", "s&p", "oil price"],
  politics: ["election", "congress", "senate", "president", "campaign", "lawmakers", "government"],
  "united-states": ["u.s.", "united states", "washington", "american"],
  world: ["world", "international", "europe", "asia", "africa", "middle east", "ukraine", "china"],
  science: ["science", "research", "study", "scientists", "discovery"],
  energy: ["energy", "solar", "wind", "nuclear", "power grid", "electricity"],
  climate: ["climate", "emissions", "carbon", "warming", "drought", "flood"],
  healthcare: ["health", "medical", "medicine", "drug", "hospital", "disease"],
  education: ["school", "college", "university", "education", "student"],
  sports: ["sports", "soccer", "football", "basketball", "baseball", "olympics"],
  gaming: ["game", "gaming", "playstation", "xbox", "nintendo"],
  entertainment: ["film", "movie", "music", "actor", "television", "celebrity"],
  travel: ["travel", "tourism", "airline", "airport", "hotel"],
  cybersecurity: ["cyber", "hack", "ransomware", "security breach", "malware"],
  space: ["space", "nasa", "rocket", "moon", "mars", "orbit"],
};

export function classifyCategory(title: string, description: string, fallback: string) {
  const haystack = ` ${`${title} ${description}`.toLowerCase()} `;
  const ranked = Object.entries(categoryKeywords)
    .map(([slug, words]) => ({ slug, score: words.reduce((score, word) => score + (haystack.includes(word) ? 1 : 0), 0) }))
    .sort((a, b) => b.score - a.score);
  return ranked[0]?.score ? ranked[0].slug : fallback;
}

export function extractTags(title: string, description: string) {
  const known = ["OpenAI", "NVIDIA", "Federal Reserve", "interest rates", "semiconductors", "climate", "cybersecurity", "space", "startups"];
  const haystack = `${title} ${description}`.toLowerCase();
  return known.filter((tag) => haystack.includes(tag.toLowerCase()));
}
