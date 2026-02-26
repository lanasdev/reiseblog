import type { AccessTier } from '@/lib/types'

interface AccessControlledPost {
  accessTier?: AccessTier | null
}

export function normalizeAccessTier(value: AccessTier | null | undefined): AccessTier {
  return value === 'subscriber' ? 'subscriber' : 'free'
}

export function isSubscriberOnlyPost(post: AccessControlledPost): boolean {
  return normalizeAccessTier(post.accessTier) === 'subscriber'
}

export function canViewPost(
  post: AccessControlledPost,
  isSubscriber: boolean
): boolean {
  return !isSubscriberOnlyPost(post) || isSubscriber
}
