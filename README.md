# Reiseblog

A travel blog template built with [Next.js](https://nextjs.org) and [Sanity](https://www.sanity.io).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flanasdev%2Freiseblog&repository-name=reiseblog&project-name=reiseblog&demo-title=Travel%20Blog%20with%20Next.js%20%26%20Sanity&demo-description=Real-time%20updates%2C%20seamless%20editing%2C%20no%20rebuild%20delays.&demo-url=https%3A%2F%2Fnext-blog.sanity.build%2F&demo-image=https%3A%2F%2Fgithub.com%2Fsanity-io%2Fnext-sanity%2Fassets%2F81981%2Fb81296a9-1f53-4eec-8948-3cb51aca1259&integration-ids=oac_hb2LITYajhRQ0i4QznmKH7gx)

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) for the site and [http://localhost:3000/studio](http://localhost:3000/studio) for Sanity Studio.

## Paid tier access

Posts now support an `accessTier` field (`free` or `subscriber`) in Sanity Studio.

- Free users can view all `free` posts.
- `subscriber` posts render a paywall until an authenticated user completes a paid subscription.

Authentication uses Better Auth + Prisma. Payments use Stripe Checkout (subscriptions).

### Environment variables

- `BETTER_AUTH_URL` (e.g. `http://localhost:3000`)
- `BETTER_AUTH_SECRET` (required in production)
- `DATABASE_URL` (PostgreSQL connection string)
- `SUBSCRIBER_LOCKED_POST_SLUGS` (optional comma-separated fallback slugs)

**Stripe (required for subscription payments):**

- `STRIPE_SECRET_KEY` – from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
- `STRIPE_WEBHOOK_SECRET` – from Stripe Dashboard → Developers → Webhooks
- `STRIPE_PRICE_ID` – create a recurring Price for your subscription product in Stripe

Create a webhook endpoint in Stripe pointing to `https://your-domain.com/api/stripe/webhook` and listen for `checkout.session.completed`, `customer.subscription.updated`, and `customer.subscription.deleted`.

For local testing, use [Stripe CLI](https://stripe.com/docs/stripe-cli) to forward webhooks: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.

Users sign in via `/auth` and subscribe via Stripe Checkout. After payment they are redirected back to the post or home.

### Prisma setup

```bash
pnpm prisma:generate
pnpm prisma:push
```

