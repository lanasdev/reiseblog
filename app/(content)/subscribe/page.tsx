import SubscriberAccessForm from '@/components/subscriber/SubscriberAccessForm'
import SubscriberLogoutButton from '@/components/subscriber/SubscriberLogoutButton'
import {
  getSubscriberAccessCodeHint,
  hasSubscriberSession,
} from '@/lib/subscriber-session'
import { CheckCircle2, Lock, Sparkles } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Subscribe',
  description: 'Get full access to subscriber-only travel stories.',
}

export default async function SubscribePage() {
  const [isSubscriber, accessCodeHint] = await Promise.all([
    hasSubscriberSession(),
    Promise.resolve(getSubscriberAccessCodeHint()),
  ])

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

        {isSubscriber ? (
          <div className="space-y-4">
            <p className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/5 px-3 py-2 text-sm text-primary">
              <Lock className="h-4 w-4" />
              Subscriber access is currently active.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <SubscriberLogoutButton label="Deactivate access" />
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
            <SubscriberAccessForm submitLabel="Activate subscriber access" />
            {accessCodeHint && (
              <p className="rounded-md border border-dashed border-border bg-secondary/40 px-3 py-2 text-xs text-muted-foreground">
                Local development hint: use{' '}
                <code className="font-mono text-foreground">{accessCodeHint}</code>{' '}
                or set <code className="font-mono text-foreground">SUBSCRIBER_ACCESS_CODE</code>{' '}
                in <code className="font-mono text-foreground">.env.local</code>.
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
