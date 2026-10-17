import assert from "node:assert/strict";
import test from "node:test";
import { commercialSlugs, productSlugs } from "../lib/seo-pages.ts";
import { siteUrl } from "../lib/site.ts";
import sitemap, { withLastModified } from "./sitemap.ts";

test("keeps canonical homepage, commercial, and product URLs in the sitemap", () => {
  const urls = sitemap().map(({ url }) => url);

  assert.deepEqual(urls, [
    `${siteUrl}/`,
    ...commercialSlugs.map((slug) => `${siteUrl}/${slug}`),
    ...productSlugs.map((slug) => `${siteUrl}/${slug}`),
  ]);
  assert.ok(urls.every((url) => url.startsWith(`${siteUrl}/`)));
});

test("uses verified content dates instead of sitemap generation time", () => {
  const entries = sitemap();

  assert.ok(entries.every((entry) => entry.lastModified === "2026-10-08"));
});

test("omits lastModified when no verified date is available", () => {
  const entry = withLastModified({ url: `${siteUrl}/unknown-page` }, undefined);

  assert.deepEqual(entry, { url: `${siteUrl}/unknown-page` });
});
