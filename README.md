# News Intelligence

News Intelligence is a local-first personal news aggregation and AI summarization app. It collects configurable RSS feeds, normalizes and deduplicates articles, groups coverage into stories, summarizes important stories with OpenAI when configured, and presents a source-transparent daily briefing.

## Requirements

- Node.js 20+
- PostgreSQL 14+
- An OpenAI API key for AI-generated summaries (optional for collection and browsing)

## Install

```bash
npm install
cp .env.example .env
```

Set `DATABASE_URL` in `.env`. A local PostgreSQL database can be created with:

```bash
createdb news_intelligence
```

Then initialize Prisma and seed the demo story, default categories, user preferences, and initial RSS sources:

```bash
npm run db:push
npm run db:seed
```

Start the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

See [.env.example](.env.example):

- `DATABASE_URL` — PostgreSQL connection string.
- `OPENAI_API_KEY` — required for OpenAI story synthesis; collection still works without it.
- `AI_CLASSIFICATION_MODEL` — reserved for model-assisted classification extensions.
- `AI_SUMMARY_MODEL` — model used for source-grounded story synthesis.
- `INGESTION_SECRET` — protects ingestion and summarization endpoints in production.
- `NEXT_PUBLIC_APP_URL` — public URL used by future notification integrations.

## Running ingestion and summarization

Collect live RSS articles with:

```bash
npm run ingest
```

The pipeline is fault-tolerant per source: one feed failure is logged in `IngestionRun` and source health fields without aborting other feeds. It performs URL/title normalization, exact and near-duplicate checks, story clustering, category/tag extraction, importance ordering, and cached story synthesis. It does not scrape pages, bypass paywalls, or use Codex as a news source.

When `OPENAI_API_KEY` is present, new stories are summarized from the collected source packet. The prompt requires JSON output, source-only facts, explicit uncertainty, and an explicit statement when next steps are not reported. The same story is not repeatedly summarized once `summary` is populated.

## Useful scripts

```bash
npm run dev          # development server
npm run build        # production build
npm run start        # production server
npm run test         # unit tests
npm run typecheck    # TypeScript checks
npm run lint         # Next/ESLint checks
npm run db:push      # apply Prisma schema without migration history
npm run db:migrate   # create a development migration
npm run db:seed      # seed categories, sources, preferences, and a sample story
npm run db:studio    # open Prisma Studio
npm run ingest       # fetch enabled RSS feeds
```

## Initial RSS sources

The seed configuration uses publisher RSS endpoints for BBC World, NPR News, BBC Business, Dow Jones Markets, The Verge, TechCrunch, Ars Technica, and NASA Breaking News. They are stored as editable `Source` rows rather than hardcoded in the ingestion logic. If a publisher changes or retires a feed, disable or replace that row from the database.

## Application structure

```text
src/app/                  Next.js App Router pages and API routes
src/components/           Dashboard and preference UI components
src/lib/news/              Feed health, classification, dedupe, importance, ingestion
src/lib/ai.ts              OpenAI source-grounded summary integration
prisma/schema.prisma      PostgreSQL data model and indexes
prisma/seed.ts             default categories, sources, preferences, demo data
scripts/ingest.ts          CLI ingestion entry point
tests/news.test.ts         normalization and clustering tests
```

## API surface

- `GET /api/stories?category=technology`
- `GET /api/stories/:id`
- `GET /api/categories`
- `GET /api/sources`
- `GET /api/search?q=semiconductors`
- `GET /api/briefing`
- `GET /api/status`
- `GET|POST /api/preferences`
- `POST /api/ingest` — protected by `INGESTION_SECRET` in production
- `POST /api/summarize` — protected by `INGESTION_SECRET` in production

Authentication is intentionally kept light for the first local version. The data model has `User` and `UserPreference` boundaries so a real auth provider and multiple users can be added without replacing the news graph.

## Deployment

Provision PostgreSQL, set the environment variables in the hosting provider, run `npx prisma migrate deploy`, run `npm run build`, and launch with `npm run start`. Schedule `npm run ingest` with the provider's cron/worker facility. For production, add a queue or worker process for high-volume summarization and a real authentication layer before exposing preference data to multiple users.

## Current limitations and next steps

This first foundation uses RSS only, a demo user instead of full authentication, a portable Prisma substring search instead of a PostgreSQL `tsvector` index, and a rule-based classifier with OpenAI reserved for story synthesis. The next best additions are scheduled background workers, richer source-specific parsing, PostgreSQL full-text search, saved stories, and email/notification delivery.
