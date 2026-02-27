import 'server-only'

import { appendFileSync } from 'node:fs'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient
}

function getDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL?.trim()
  if (databaseUrl) return databaseUrl
  throw new Error('DATABASE_URL must be set for Prisma Postgres.')
}

function createPrismaClient() {
  // #region agent log
  appendFileSync('/opt/cursor/logs/debug.log', JSON.stringify({ hypothesisId: 'C', location: 'lib/prisma.ts:createPrismaClient', message: 'Prisma client init start', data: { hasDatabaseUrl: Boolean(process.env.DATABASE_URL?.trim()) }, timestamp: Date.now() }) + '\n')
  // #endregion

  const adapter = new PrismaPg({
    connectionString: getDatabaseUrl(),
  })

  try {
    const client = new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    })

    return client
  } catch (error) {
    // #region agent log
    appendFileSync('/opt/cursor/logs/debug.log', JSON.stringify({ hypothesisId: 'C', location: 'lib/prisma.ts:createPrismaClient', message: 'Prisma client init failed', data: { error: error instanceof Error ? { name: error.name, message: error.message } : { type: typeof error } }, timestamp: Date.now() }) + '\n')
    // #endregion
    throw error
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
