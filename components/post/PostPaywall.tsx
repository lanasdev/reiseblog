import SubscriberAccessForm from '@/components/subscriber/SubscriberAccessForm'
import type { BlogPost } from '@/lib/types'
import { Lock } from 'lucide-react'
import Link from 'next/link'

export default function PostPaywall({ post }: { post: BlogPost }) {
  return (
    <section className="mx-auto my-8 max-w-3xl px-5 md:my-12 md:px-8">
      <div className="rounded-xl border border-border bg-card p-5 md:p-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
          <Lock className="h-3.5 w-3.5" />
          Subscriber only story
        </div>

        <h2 className="font-serif text-2xl font-semibold text-card-foreground md:text-3xl">
          Continue reading with a subscriber membership
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
          {post.excerpt}
        </p>

        <div className="my-6 h-px w-full bg-border" />

        <SubscriberAccessForm
          redirectTo={`/post/${post.slug}`}
          submitLabel="Unlock this post"
        />

        <p className="mt-4 text-sm text-muted-foreground">
          Need a subscription first?{' '}
          <Link href="/subscribe" className="font-medium text-primary underline">
            View subscriber options
          </Link>
        </p>
      </div>
    </section>
  )
}
