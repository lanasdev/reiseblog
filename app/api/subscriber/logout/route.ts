import {
  getSubscriberCookieOptions,
  SUBSCRIBER_COOKIE_NAME,
} from '@/lib/subscriber-session'
import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ success: true })
  response.cookies.set({
    name: SUBSCRIBER_COOKIE_NAME,
    value: '',
    ...getSubscriberCookieOptions(),
    maxAge: 0,
  })
  return response
}
