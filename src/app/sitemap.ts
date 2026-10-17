import type { MetadataRoute } from "next";
import { siteUrl } from "../lib/site";
import { commercialSlugs, productSlugs } from "../lib/seo-pages";

// Omit lastModified until page-specific, verified content update dates are maintained.
// A sitemap generation timestamp is not a content modification timestamp.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    ...commercialSlugs.map((slug) => ({
      url: `${siteUrl}/${slug}`,
      changeFrequency: "monthly" as const,
      priority: slug === "pallets-buenos-aires" ? 0.9 : 0.8,
    })),
    ...productSlugs.map((slug) => ({
      url: `${siteUrl}/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
