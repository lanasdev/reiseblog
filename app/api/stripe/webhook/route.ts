import { prisma } from '@/lib/prisma'
import { getStripe } from '@/lib/stripe'
import type Stripe from 'stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

async function setSubscriptionActive(
  userId: string,
  stripeCustomerId: string,
  stripeSubscriptionId: string,
  currentPeriodEnd: Date
) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      isSubscriber: true,
      stripeCustomerId,
      stripeSubscriptionId,
      subscriptionStatus: 'active',
      subscriptionCurrentPeriodEnd: currentPeriodEnd,
    },
  })
}

async function setSubscriptionEnded(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      isSubscriber: false,
      subscriptionStatus: 'canceled',
      subscriptionCurrentPeriodEnd: null,
    },
  })
}

async function findUserIdFromSubscription(
  stripeSubscriptionId: string
): Promise<string | null> {
  const user = await prisma.user.findUnique({
    where: { stripeSubscriptionId },
    select: { id: true },
  })
  return user?.id ?? null
}

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim()
  if (!webhookSecret) {
    console.error('[stripe-webhook] STRIPE_WEBHOOK_SECRET not set')
    return NextResponse.json(
      { error: 'Webhook not configured' },
      { status: 500 }
    )
  }

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[stripe-webhook] Signature verification failed:', message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId
        const subscriptionId =
          typeof session.subscription === 'string'
            ? session.subscription
            : session.subscription?.id
        const customerId =
          typeof session.customer === 'string'
            ? session.customer
            : session.customer?.id

        if (!userId || !subscriptionId || !customerId) {
          console.error('[stripe-webhook] Missing data in checkout.session.completed', {
            userId,
            subscriptionId,
            customerId,
          })
          return NextResponse.json({ received: true })
        }

        const stripe = getStripe()
        const subscription = await stripe.subscriptions.retrieve(subscriptionId)
        const periodEnd = subscription.current_period_end
          ? new Date(subscription.current_period_end * 1000)
          : new Date()

        await setSubscriptionActive(
          userId,
          customerId,
          subscriptionId,
          periodEnd
        )
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata?.userId ?? (await findUserIdFromSubscription(subscription.id))

        if (!userId) {
          return NextResponse.json({ received: true })
        }

        const isActive = ['active', 'trialing'].includes(subscription.status)
        const periodEnd = subscription.current_period_end
          ? new Date(subscription.current_period_end * 1000)
          : null

        await prisma.user.update({
          where: { id: userId },
          data: {
            isSubscriber: isActive,
            subscriptionStatus: subscription.status,
            subscriptionCurrentPeriodEnd: periodEnd,
          },
        })
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata?.userId ?? (await findUserIdFromSubscription(subscription.id))

        if (!userId) {
          return NextResponse.json({ received: true })
        }

        await setSubscriptionEnded(userId)
        break
      }

      default:
        // Unhandled event type
        break
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('[stripe-webhook] Error processing event:', event.type, err)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
