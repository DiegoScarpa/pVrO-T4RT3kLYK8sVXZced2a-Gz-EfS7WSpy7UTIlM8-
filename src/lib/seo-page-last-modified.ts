import { commercialSlugs, productSlugs } from "./seo-pages.ts";

/**
 * Verified content update dates for sitemap URLs, recorded at day precision.
 * The homepage and commercial page data were last changed in the 2026-10-08
 * "Add commercial SEO architecture and technical metadata" commit.
 * Update these dates when page content changes; leave a URL out when its date
 * cannot be verified.
 */
const commercialContentDate = "2026-10-08";

export const sitemapLastModified: Record<string, string> = {
  "/": "2026-10-08",
  ...Object.fromEntries(
    [...commercialSlugs, ...productSlugs].map((slug) => [
      `/${slug}`,
      commercialContentDate,
    ]),
  ),
};
