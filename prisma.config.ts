import { config } from 'dotenv'
import { defineConfig } from 'prisma/config'

// Prisma CLI loads .env only; load .env.local so db push etc. work
config({ path: '.env', quiet: true })
config({ path: '.env.local', override: true, quiet: true })

const databaseUrl = process.env.DATABASE_URL

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: databaseUrl,
  },
})
