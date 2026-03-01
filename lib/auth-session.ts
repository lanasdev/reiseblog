import 'server-only'

import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export interface ViewerAccess {
  userId: string | null
  name: string | null
  email: string | null
  isAuthenticated: boolean
  isSubscriber: boolean
}

export async function getViewerAccess(): Promise<ViewerAccess> {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user?.id) {
    return {
      userId: null,
      name: null,
      email: null,
      isAuthenticated: false,
      isSubscriber: false,
    }
  }

  const databaseUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { isSubscriber: true },
  })

  return {
    userId: session.user.id,
    name: session.user.name ?? null,
    email: session.user.email ?? null,
    isAuthenticated: true,
    isSubscriber: databaseUser?.isSubscriber ?? false,
  }
}
