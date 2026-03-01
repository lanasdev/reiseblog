import { getStripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

interface Props {
  searchParams: Promise<{ session_id?: string; redirect?: string }>
}

function getSafeRedirect(path: string | undefined): string {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return '/'
  return path
}

export default async function SubscribeSuccessPage({ searchParams }: Props) {
  const { session_id: sessionId, redirect: redirectParam } = await searchParams

  if (!sessionId) {
    redirect('/subscribe')
  }

  const redirectTo = getSafeRedirect(
    redirectParam ? decodeURIComponent(redirectParam) : undefined
  )

  try {
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription'],
    })

    if (session.payment_status !== 'paid' || !session.metadata?.userId) {
      redirect('/subscribe')
    }

    const userId = session.metadata.userId
    const subscriptionId =
      typeof session.subscription === 'string'
        ? session.subscription
        : session.subscription?.id
    const customerId =
      typeof session.customer === 'string'
        ? session.customer
        : session.customer?.id

    if (subscriptionId && customerId) {
      let periodEnd = new Date()
      if (typeof session.subscription === 'object' && session.subscription) {
        const sub = session.subscription as { current_period_end?: number }
        if (sub.current_period_end) {
          periodEnd = new Date(sub.current_period_end * 1000)
        }
      }

      await prisma.user.update({
        where: { id: userId },
        data: {
          isSubscriber: true,
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscriptionId,
          subscriptionStatus: 'active',
          subscriptionCurrentPeriodEnd: periodEnd,
        },
      })
    }
  } catch (err) {
    console.error('[subscribe/success]', err)
    redirect('/subscribe')
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-5 py-10 md:px-8 md:py-14">
      <div className="rounded-xl border border-border bg-card p-5 md:p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-serif text-2xl font-semibold text-card-foreground md:text-3xl">
            Welcome to Reiseblog Subscriber
          </h1>
          <p className="text-sm text-muted-foreground">
            Your subscription is active. You now have full access to all travel
            stories.
          </p>
          <Link
            href={redirectTo}
            className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Continue to {redirectTo === '/' ? 'the map' : 'your destination'}
          </Link>
        </div>
      </div>
    </main>
  )
}
