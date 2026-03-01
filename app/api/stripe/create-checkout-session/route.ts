import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getBaseUrl, getStripe, getStripePriceId } from '@/lib/stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user?.id || !session.user.email) {
      return NextResponse.json(
        { error: 'Please sign in before subscribing.' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const redirectPath = searchParams.get('redirect') ?? '/'
    const baseUrl = getBaseUrl()
    const successUrl = `${baseUrl}/subscribe/success?session_id={CHECKOUT_SESSION_ID}&redirect=${encodeURIComponent(redirectPath)}`
    const cancelUrl = `${baseUrl}/subscribe?redirect=${encodeURIComponent(redirectPath)}`

    const stripe = getStripe()
    const priceId = getStripePriceId()

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: session.user.email,
      metadata: {
        userId: session.user.id,
      },
      subscription_data: {
        metadata: {
          userId: session.user.id,
        },
      },
    })

    if (!checkoutSession.url) {
      return NextResponse.json(
        { error: 'Failed to create checkout session.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ url: checkoutSession.url })
  } catch (err) {
    console.error('[create-checkout-session]', err)
    return NextResponse.json(
      { error: 'Unable to start checkout. Please try again.' },
      { status: 500 }
    )
  }
}
