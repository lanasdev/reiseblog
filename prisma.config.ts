import { defineConfig } from 'prisma/config'

const authDatabaseUrl = process.env.AUTH_DATABASE_URL ?? 'file:./prisma/dev.db'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: authDatabaseUrl,
  },
})
