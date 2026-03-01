import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: 'Please sign in before subscribing.' },
      { status: 401 }
    )
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { isSubscriber: true },
  })

  return NextResponse.json({ success: true })
}
