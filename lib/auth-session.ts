import 'server-only'

import { appendFileSync } from 'node:fs'
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
  // #region agent log
  appendFileSync('/opt/cursor/logs/debug.log', JSON.stringify({ hypothesisId: 'A', location: 'lib/auth-session.ts:getViewerAccess', message: 'getViewerAccess entry', data: {}, timestamp: Date.now() }) + '\n')
  // #endregion

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // #region agent log
  appendFileSync('/opt/cursor/logs/debug.log', JSON.stringify({ hypothesisId: 'A', location: 'lib/auth-session.ts:getViewerAccess', message: 'Session fetched', data: { hasSession: Boolean(session), hasUserId: Boolean(session?.user?.id) }, timestamp: Date.now() }) + '\n')
  // #endregion

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
