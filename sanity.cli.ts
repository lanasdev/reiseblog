import { loadEnvConfig } from '@next/env'
import { defineCliConfig } from 'sanity/cli'

const dev = process.env.NODE_ENV !== 'production'
loadEnvConfig(__dirname, dev, { info: () => null, error: console.error })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'kgimgch3'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export default defineCliConfig({
  api: { projectId, dataset },
  vite: {
    resolve: {
      alias: { '@': __dirname },
    },
  },
  deployment: {
    appId: 'i8p1plzw8xy88h2i5lrz0dcd',
    autoUpdates: true
  }
})
