import {
  createSubscriberSessionToken,
  getSubscriberCookieOptions,
  SUBSCRIBER_COOKIE_NAME,
  SUBSCRIBER_SESSION_MAX_AGE,
  validateSubscriberAccessCode,
} from '@/lib/subscriber-session'
import { NextResponse } from 'next/server'

interface LoginBody {
  accessCode?: unknown
}

export async function POST(request: Request) {
  let payload: LoginBody = {}

  try {
    payload = (await request.json()) as LoginBody
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 }
    )
  }

  const accessCode =
    typeof payload.accessCode === 'string' ? payload.accessCode : ''

  if (!validateSubscriberAccessCode(accessCode)) {
    return NextResponse.json(
      { error: 'The subscriber access code is invalid.' },
      { status: 401 }
    )
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set({
    name: SUBSCRIBER_COOKIE_NAME,
    value: createSubscriberSessionToken(),
    ...getSubscriberCookieOptions(),
    maxAge: SUBSCRIBER_SESSION_MAX_AGE,
  })

  return response
}
