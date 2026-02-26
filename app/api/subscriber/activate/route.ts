import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { validateSubscriberAccessCode } from '@/lib/subscriber-access'
import { NextResponse } from 'next/server'

interface ActivateBody {
  accessCode?: unknown
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: 'Please sign in before activating subscriber access.' },
      { status: 401 }
    )
  }

  let payload: ActivateBody = {}
  try {
    payload = (await request.json()) as ActivateBody
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const accessCode =
    typeof payload.accessCode === 'string' ? payload.accessCode : ''

  if (!validateSubscriberAccessCode(accessCode)) {
    return NextResponse.json(
      { error: 'The subscriber access code is invalid.' },
      { status: 401 }
    )
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { isSubscriber: true },
  })

  return NextResponse.json({ success: true })
}
