import 'server-only'

import { prismaAdapter } from 'better-auth/adapters/prisma'
import { betterAuth } from 'better-auth'
import { nextCookies } from 'better-auth/next-js'
import { prisma } from '@/lib/prisma'

const devAuthSecret = 'reiseblog-dev-better-auth-secret-change-me'

function getAuthSecret(): string {
  const configuredSecret = process.env.BETTER_AUTH_SECRET?.trim()
  if (configuredSecret) return configuredSecret

  if (process.env.NODE_ENV !== 'production') {
    return devAuthSecret
  }

  throw new Error('BETTER_AUTH_SECRET must be set in production.')
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  secret: getAuthSecret(),
  baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhost:3000',
  user: {
    additionalFields: {
      isSubscriber: {
        type: 'boolean',
        required: false,
        defaultValue: false,
        input: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  plugins: [nextCookies()],
})
