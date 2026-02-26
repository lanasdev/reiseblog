import 'server-only'

import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

export const SUBSCRIBER_COOKIE_NAME = 'reiseblog_subscriber'
export const SUBSCRIBER_SESSION_MAX_AGE = 60 * 60 * 24 * 30
export const DEFAULT_SUBSCRIBER_ACCESS_CODE = 'reiseblog-plus-demo'

const DEV_SUBSCRIBER_SESSION_SECRET = 'reiseblog-dev-subscriber-secret-change-me'

interface SubscriberSessionPayload {
  tier: 'subscriber'
  exp: number
  v: 1
}

function getSubscriberSessionSecret(): string {
  const secret = process.env.SUBSCRIBER_SESSION_SECRET?.trim()
  if (secret && secret.length >= 32) {
    return secret
  }

  if (process.env.NODE_ENV !== 'production') {
    return DEV_SUBSCRIBER_SESSION_SECRET
  }

  throw new Error(
    'SUBSCRIBER_SESSION_SECRET must be set (min 32 chars) in production.'
  )
}

function getExpectedSubscriberAccessCode(): string {
  const configuredCode = process.env.SUBSCRIBER_ACCESS_CODE?.trim()
  return configuredCode ? configuredCode : DEFAULT_SUBSCRIBER_ACCESS_CODE
}

function createSignature(payload: string): string {
  return createHmac('sha256', getSubscriberSessionSecret())
    .update(payload)
    .digest('base64url')
}

function secureEqual(left: string, right: string): boolean {
  if (left.length !== right.length) return false
  return timingSafeEqual(Buffer.from(left), Buffer.from(right))
}

function parseSession(token: string): SubscriberSessionPayload | null {
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return null

  const expectedSignature = createSignature(payload)
  if (!secureEqual(signature, expectedSignature)) return null

  try {
    const decoded = Buffer.from(payload, 'base64url').toString('utf8')
    const session = JSON.parse(decoded) as SubscriberSessionPayload

    if (session.v !== 1) return null
    if (session.tier !== 'subscriber') return null
    if (typeof session.exp !== 'number') return null
    if (Date.now() >= session.exp * 1000) return null

    return session
  } catch {
    return null
  }
}

export function createSubscriberSessionToken(): string {
  const payload: SubscriberSessionPayload = {
    tier: 'subscriber',
    v: 1,
    exp: Math.floor(Date.now() / 1000) + SUBSCRIBER_SESSION_MAX_AGE,
  }
  const encodedPayload = Buffer.from(JSON.stringify(payload), 'utf8').toString(
    'base64url'
  )
  return `${encodedPayload}.${createSignature(encodedPayload)}`
}

export function getSubscriberCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  }
}

export async function hasSubscriberSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SUBSCRIBER_COOKIE_NAME)?.value
  if (!token) return false
  return Boolean(parseSession(token))
}

export function validateSubscriberAccessCode(rawCode: string): boolean {
  const submittedCode = rawCode.trim()
  const expectedCode = getExpectedSubscriberAccessCode()
  if (!submittedCode) return false
  return secureEqual(submittedCode, expectedCode)
}

export function getSubscriberAccessCodeHint(): string | null {
  if (process.env.SUBSCRIBER_ACCESS_CODE?.trim()) return null
  return DEFAULT_SUBSCRIBER_ACCESS_CODE
}
