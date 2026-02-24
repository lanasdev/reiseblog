# Reiseblog

A travel blog built with Next.js 16 + Sanity v5 CMS, styled with Tailwind CSS v4 and shadcn/ui.

## Cursor Cloud specific instructions

### Services

| Service | URL | Notes |
|---------|-----|-------|
| Next.js dev server | http://localhost:3000 | `pnpm dev` — serves both frontend and embedded Sanity Studio |
| Sanity Studio | http://localhost:3000/studio | Embedded in the Next.js app; requires Sanity auth to use |

### Commands

See `package.json` scripts:

- **Dev server:** `pnpm dev`
- **Build:** `pnpm build`
- **Lint:** `pnpm lint` (runs Biome)
- **No automated test suite** — there are no unit/integration tests in this repo.

### Gotchas

- **pnpm build scripts:** `esbuild` and `sharp` require post-install build scripts. The `pnpm.onlyBuiltDependencies` field in `package.json` allows these. Without it, pnpm silently skips their builds and Next.js image optimization / bundling breaks at runtime.
- **Sanity project ID:** A fallback project ID is hardcoded in `sanity/lib/api.ts`, so the app starts without configuring `.env.local`. However, draft mode and visual editing require `SANITY_API_READ_TOKEN` in `.env.local`.
- **TypeScript build errors ignored:** `next.config.mjs` sets `typescript.ignoreBuildErrors: true` due to Sanity plugin typing issues. The build will succeed even with TS errors.
- **Leaflet CSS:** The map component uses dynamic imports (`next/dynamic` with `ssr: false`) to avoid SSR issues with Leaflet.
