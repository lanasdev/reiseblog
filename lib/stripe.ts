import 'server-only'
import Stripe from 'stripe'

function getStripeSecretKey(): string {
  const key = process.env.STRIPE_SECRET_KEY?.trim()
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY must be set for subscription payments.')
  }
  return key
}

export function getStripe(): Stripe {
  return new Stripe(getStripeSecretKey(), {
    typescript: true,
  })
}

export function getStripePriceId(): string {
  const id = process.env.STRIPE_PRICE_ID?.trim()
  if (!id) {
    throw new Error('STRIPE_PRICE_ID must be set. Create a Price in Stripe Dashboard.')
  }
  return id
}

export function getBaseUrl(): string {
  return process.env.BETTER_AUTH_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
}
