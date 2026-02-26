# Reiseblog

A travel blog built with Next.js 16 (canary) + Sanity CMS + Tailwind CSS 4 + Leaflet maps.

## Cursor Cloud specific instructions

### Services

| Service | Command | URL |
|---|---|---|
| Next.js Dev Server (includes Sanity Studio) | `pnpm dev` | http://localhost:3000 |

The app is a single Next.js process — `pnpm dev` serves both the blog frontend and the embedded Sanity Studio at `/studio`.

### Key commands

See `package.json` scripts. Summary:

- **Dev**: `pnpm dev`
- **Lint**: `pnpm lint` (uses Biome — exit code 0 even with style suggestions)
- **Build**: `pnpm build`

There are no automated tests in this project.

### Environment

- Copy `.env.example` to `.env.local` before first run. The app has hardcoded fallback values for `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`, plus demo posts in `lib/demo-posts.ts`, so the blog works without any Sanity credentials.
- `SANITY_API_READ_TOKEN` is optional — only needed for draft mode / visual editing.
- TypeScript build errors are intentionally suppressed in `next.config.mjs` (`ignoreBuildErrors: true`).

### Gotchas

- `esbuild` and `sharp` require native build scripts. The `pnpm.onlyBuiltDependencies` field in `package.json` allows these; without it `pnpm install` skips their postinstall and the dev server may fail.
- Next.js 16 canary uses Turbopack by default. The first page load in dev mode triggers compilation and may take a few seconds.
- Sanity Studio at `/studio` requires a Sanity account login to manage content (Google, GitHub, or email providers).
