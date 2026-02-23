/**
 * Sanity configuration. Uses env vars with fallbacks for demo mode.
 */

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'kgimgch3'

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2025-02-27'

export const studioUrl = '/studio'
