'use client'

import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
} from '@/sanity/lib/api'
import * as resolve from '@/sanity/plugins/resolve'
import {
  pageStructure,
  singletonPlugin,
} from '@/sanity/plugins/settings'
import duration from '@/sanity/schemas/objects/duration'
import milestone from '@/sanity/schemas/objects/milestone'
import timeline from '@/sanity/schemas/objects/timeline'
import page from '@/sanity/schemas/documents/page'
import home from '@/sanity/schemas/singletons/home'
import settings from '@/sanity/schemas/singletons/settings'
import { post } from '@/sanity/schemaTypes/post'
import { tag } from '@/sanity/schemaTypes/tag'
import { assist } from '@sanity/assist'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { media } from 'sanity-plugin-media'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Reiseblog'

export default defineConfig({
  basePath: studioUrl,
  projectId,
  dataset,
  title,
  schema: {
    types: [
      home,
      settings,
      post,
      tag,
      page,
      duration,
      milestone,
      timeline,
    ],
  },
  plugins: [
    structureTool({
      structure: pageStructure([home, settings]),
    }),
    presentationTool({
      resolve,
      previewUrl: { previewMode: { enable: '/api/draft-mode/enable' } },
    }),
    singletonPlugin([home.name, settings.name]),
    assist(),
    media(),
    unsplashImageAsset(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
