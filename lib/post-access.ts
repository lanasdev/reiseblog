import type { AccessTier } from '@/lib/types'

interface AccessControlledPost {
  accessTier?: AccessTier | null
  slug?: string | null
}

const DEFAULT_LOCKED_SLUGS = [
  'northern-lights-tromso',
  'dolomites-hiking',
  'patagonia-wilderness',
]

let cachedLockedSlugSet: Set<string> | null = null

function getLockedSlugSet(): Set<string> {
  if (cachedLockedSlugSet) return cachedLockedSlugSet

  const configuredSlugs = process.env.SUBSCRIBER_LOCKED_POST_SLUGS?.split(',')
    .map((slug) => slug.trim().toLowerCase())
    .filter(Boolean)

  cachedLockedSlugSet = new Set(
    configuredSlugs?.length ? configuredSlugs : DEFAULT_LOCKED_SLUGS
  )
  return cachedLockedSlugSet
}

export function normalizeAccessTier(value: AccessTier | null | undefined): AccessTier {
  return value === 'subscriber' ? 'subscriber' : 'free'
}

export function resolveAccessTier(post: AccessControlledPost): AccessTier {
  const explicitTier = normalizeAccessTier(post.accessTier)
  if (explicitTier === 'subscriber') return 'subscriber'

  const postSlug = post.slug?.trim().toLowerCase()
  if (!postSlug) return explicitTier

  return getLockedSlugSet().has(postSlug) ? 'subscriber' : explicitTier
}

export function applyResolvedAccessTier<T extends AccessControlledPost>(
  post: T
): Omit<T, 'accessTier'> & { accessTier: AccessTier } {
  return {
    ...post,
    accessTier: resolveAccessTier(post),
  }
}

export function isSubscriberOnlyPost(post: AccessControlledPost): boolean {
  return resolveAccessTier(post) === 'subscriber'
}

export function canViewPost(
  post: AccessControlledPost,
  isSubscriber: boolean
): boolean {
  return !isSubscriberOnlyPost(post) || isSubscriber
}
