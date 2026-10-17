import type { MetadataRoute } from "next";
import { siteUrl } from "../lib/site.ts";
import { commercialSlugs, productSlugs } from "../lib/seo-pages.ts";
import { sitemapLastModified } from "../lib/seo-page-last-modified.ts";

export function withLastModified(
  entry: MetadataRoute.Sitemap[number],
  lastModified?: string,
): MetadataRoute.Sitemap[number] {
  return lastModified ? { ...entry, lastModified } : entry;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    withLastModified(
      { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
      sitemapLastModified["/"],
    ),
    ...commercialSlugs.map((slug) =>
      withLastModified(
        {
          url: `${siteUrl}/${slug}`,
          changeFrequency: "monthly" as const,
          priority: slug === "pallets-buenos-aires" ? 0.7 : 0.8,
        },
        sitemapLastModified[`/${slug}`],
      ),
    ),
    ...productSlugs.map((slug) =>
      withLastModified(
        { url: `${siteUrl}/${slug}`, changeFrequency: "monthly" as const, priority: 0.7 },
        sitemapLastModified[`/${slug}`],
      ),
    ),
  ];
}
