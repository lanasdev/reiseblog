import SubscribeButton from '@/components/subscriber/SubscribeButton'
import SubscriberLogoutButton from '@/components/subscriber/SubscriberLogoutButton'
import { getViewerAccess } from '@/lib/auth-session'
import { CheckCircle2, Lock, Sparkles, UserRound } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Subscribe',
  description: 'Get full access to subscriber-only travel stories.',
}

function getSafeRedirect(path: string | undefined): string {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return '/'
  return path
}

interface Props {
  searchParams: Promise<{ redirect?: string }>
}

export default async function SubscribePage({ searchParams }: Props) {
  const { redirect: redirectParam } = await searchParams
  const redirectTo = getSafeRedirect(
    redirectParam ? decodeURIComponent(redirectParam) : undefined
  )
  const viewer = await getViewerAccess()

  const subscribeNext = redirectTo === '/' ? '/subscribe' : `/subscribe?redirect=${encodeURIComponent(redirectTo)}`

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-5 py-10 md:px-8 md:py-14">
      <div className="rounded-xl border border-border bg-card p-5 md:p-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Reiseblog Subscriber
        </div>

        <h1 className="font-serif text-3xl font-semibold text-card-foreground md:text-4xl">
          Access every story on the map
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
          Subscriber posts include extended itineraries, local logistics, and
          behind-the-scenes notes that are not visible on the free tier.
        </p>

        <ul className="mt-6 space-y-2 text-sm text-foreground/90">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            Read every subscriber-only destination guide
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            Unlock deep-dive travel planning notes
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            Keep access active across future visits
          </li>
        </ul>

        <div className="my-6 h-px w-full bg-border" />

        {!viewer.isAuthenticated ? (
          <div className="space-y-4">
            <p className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground">
              <UserRound className="h-4 w-4" />
              Log in if you already have a subscription, or create an account to
              start one.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                href={`/auth?mode=sign-in&next=${encodeURIComponent(subscribeNext)}`}
                className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Log in
              </Link>
              <Link
                href={`/auth?mode=sign-up&next=${encodeURIComponent(subscribeNext)}`}
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Subscribe for $28
              </Link>
            </div>
          </div>
        ) : viewer.isSubscriber ? (
          <div className="space-y-4">
            <p className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/5 px-3 py-2 text-sm text-primary">
              <Lock className="h-4 w-4" />
              Subscriber access is active on this account.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <SubscriberLogoutButton label="Sign out" />
              <Link
                href="/"
                className="text-sm font-medium text-primary underline"
              >
                Back to the map
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You are logged in. Activate your membership to unlock subscriber
              stories.
            </p>
            <SubscribeButton label="Subscribe for $28" redirectTo={redirectTo} />
          </div>
        )}
      </div>
    </main>
  )
}
