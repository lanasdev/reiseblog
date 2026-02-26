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
- `subscriber` posts render a paywall until the user unlocks subscriber access.

Subscriber access uses a signed HttpOnly cookie:

- `SUBSCRIBER_SESSION_SECRET` (required in production, min 32 chars)
- `SUBSCRIBER_ACCESS_CODE` (code entered on `/subscribe`)

If `SUBSCRIBER_ACCESS_CODE` is not set in local development, the fallback code is `reiseblog-plus-demo`.

