# OEMO

Online Encyclopedia of Mathematical Objects: an object-first MVP built with Next.js App Router, TypeScript, Tailwind CSS, local JSON objects, Supabase-ready infrastructure, and KaTeX.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

The first MVP pipeline renders local JSON files from `data/objects`. Supabase schema and seed tooling remain available for later database-backed publishing.

```bash
npm run validate:objects
npm run check:content
npm run check:snippets
npm run build
npm run db:seed
```

## Agent Pipeline

The agent architecture is documented in `docs/agents.md`.

Content JSON flows through schema validation, content rule checks, code snippet checks, the Next.js production build, and pull request approval.

## Main routes

- `/`
- `/search`
- `/browse/[type]`
- `/o/[object_code]`
- `/submit`
- `/admin`
- `/api/objects`
- `/api/objects/[object_code]`
- `/api/search`
