import 'server-only'

/**
 * Required for draft mode and visual editing. Omit for published content only.
 * Prefer SANITY_API_READ_TOKEN (Viewer rights) for browserToken; SANITY_API_TOKEN works as fallback.
 */
export const token =
  process.env.SANITY_API_READ_TOKEN ?? process.env.SANITY_API_TOKEN ?? undefined
