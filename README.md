# OEMO

Online Encyclopedia of Mathematical Objects: a production-ready MVP built with Next.js App Router, TypeScript, Tailwind CSS, Supabase PostgreSQL/Auth, and KaTeX.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

For database-backed mode, create a Supabase project, copy the environment variables, then run `supabase/schema.sql` in the Supabase SQL editor. The first 50 seed objects live in `src/lib/seed-data.ts`; the app uses them automatically in demo mode and they can be imported into Supabase as migration data.

```bash
npm run db:seed
```

Without Supabase environment variables, the app runs in read-only demo mode using the bundled first 50 seed objects.

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
