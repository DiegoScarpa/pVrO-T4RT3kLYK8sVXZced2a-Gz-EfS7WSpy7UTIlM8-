# Pallets Argentina

Professional one-page website for a wood pallet manufacturing and supply business. The site is built with Next.js, TypeScript, and React, and is ready for local development or deployment to Vercel.

## What is included

- Hero section with clear quote CTA
- Product showcase for Arlog, Euro, and drum pallets
- Services section for standard production, custom sizes, and coordinated delivery
- About section focused on eucaliptus saligna wood and quality control
- Service area / delivery coverage section
- FAQ accordion
- Request-a-quote form that prepares a WhatsApp inquiry
- Responsive design for desktop and mobile
- No AI, OpenAI, RSS feeds, news ingestion, or database dependencies

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

## Deploy to Vercel

This is a standard Next.js application with no server-side secrets or database setup required.

```bash
npx vercel
npx vercel --prod
```

Or import the GitHub repository into Vercel and use the default Next.js build settings. No environment variables are required for the current version. An optional `NEXT_PUBLIC_SITE_URL` value is documented in `.env.example`.

## Project structure

```text
src/app/page.tsx              Main landing page and sections
src/app/globals.css           Brand system, responsive layout, and illustrations
src/components/quote-form.tsx WhatsApp quote request flow
src/components/faq-list.tsx   FAQ accordion
src/lib/site.ts               Products, services, coverage, FAQ, and contact content
```

Contact details and content are centralized in `src/lib/site.ts` so they can be replaced with the final business information before launch.
