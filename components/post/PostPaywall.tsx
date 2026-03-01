import SubscribeButton from '@/components/subscriber/SubscribeButton'
import type { BlogPost } from '@/lib/types'
import { Lock } from 'lucide-react'
import Link from 'next/link'

interface PostPaywallProps {
  post: BlogPost
  isAuthenticated: boolean
}

export default function PostPaywall({ post, isAuthenticated }: PostPaywallProps) {
  return (
    <section className="mx-auto my-8 max-w-3xl px-5 md:my-12 md:px-8">
      <div className="rounded-xl border border-border bg-card p-5 md:p-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
          <Lock className="h-3.5 w-3.5" />
          Subscriber only story
        </div>

        <h2 className="font-serif text-2xl font-semibold text-card-foreground md:text-3xl">
          Continue with a subscriber membership
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
          {post.excerpt}
        </p>

        <div className="my-6 h-px w-full bg-border" />

        {isAuthenticated ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This post is available on the paid membership plan.
            </p>
            <SubscribeButton
              label="Subscribe for $28"
              redirectTo={`/post/${post.slug}`}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Already a member? Sign in. New here? Start your subscription for
              $28.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                href={`/auth?mode=sign-in&next=${encodeURIComponent(`/post/${post.slug}`)}`}
                className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Log in
              </Link>
              <Link
                href={`/auth?mode=sign-up&next=${encodeURIComponent(`/subscribe?redirect=${encodeURIComponent(`/post/${post.slug}`)}`)}`}
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Subscribe for $28
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
