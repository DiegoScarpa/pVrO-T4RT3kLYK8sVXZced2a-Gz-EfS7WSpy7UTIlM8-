import type { MetadataRoute } from "next";
import { siteUrl } from "../lib/site";
import { commercialSlugs, productSlugs } from "../lib/seo-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...commercialSlugs.map((slug) => ({ url: `${siteUrl}/${slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: slug === "pallets-buenos-aires" ? 0.7 : 0.8 })),
    ...productSlugs.map((slug) => ({ url: `${siteUrl}/${slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
