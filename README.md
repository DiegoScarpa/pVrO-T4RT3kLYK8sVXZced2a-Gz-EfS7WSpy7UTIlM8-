# Pallets Argentina

Conversion-focused Next.js website for a wood pallet manufacturing and supply business in Argentina.

## Included

- Commercial homepage for pallets de madera
- Product pages for pallet Arlog, pallet Euro and pallet para tambor
- Commercial pages for new, recycled, custom-size and export pallets
- Use-case pages for logistics, industry and warehouses
- Buenos Aires service-area page
- Unique titles, descriptions and canonical URLs
- JSON-LD for Organization, WebSite, WebPage, Product and visible FAQ content
- Generated XML sitemap and robots.txt
- Responsive quote form with server-side Resend delivery

## Local development

Requirements: Node.js 20+

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Vercel

Add `RESEND_API_KEY` as a Vercel Environment Variable for the environments where the quote form should send email. The key is read only by `src/app/api/contact/route.ts`; it is never exposed to the browser.

```bash
npx vercel
npx vercel --prod
```

## Project structure

```text
src/app/page.tsx                 SEO-focused homepage and sections
src/app/*/page.tsx               Commercial, product and local landing pages
src/app/sitemap.ts               Canonical XML sitemap
src/app/robots.ts                Crawl rules and sitemap reference
src/app/api/contact/route.ts     Server-side quote email delivery
src/components/quote-form.tsx    Quote form UI and validation
src/components/commercial-page.tsx Shared SEO page layouts
src/lib/seo-pages.ts              Page content, metadata and internal links
src/lib/site.ts                   Brand, products, FAQ and contact data
```

Business contact details are centralized in `src/lib/site.ts`. Product specifications are only included where they are already represented by the existing website or quote form; unknown technical details are intentionally left for confirmation.
