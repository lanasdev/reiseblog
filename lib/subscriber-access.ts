import 'server-only'

import { timingSafeEqual } from 'node:crypto'

export const DEFAULT_SUBSCRIBER_ACCESS_CODE = 'reiseblog-plus-demo'

function secureEqual(left: string, right: string): boolean {
  if (left.length !== right.length) return false
  return timingSafeEqual(Buffer.from(left), Buffer.from(right))
}

function getExpectedSubscriberAccessCode(): string {
  const configuredCode = process.env.SUBSCRIBER_ACCESS_CODE?.trim()
  return configuredCode ? configuredCode : DEFAULT_SUBSCRIBER_ACCESS_CODE
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
