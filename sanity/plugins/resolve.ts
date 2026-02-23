/**
 * Presentation Resolver API for Visual Editing
 * @see https://www.sanity.io/docs/presentation-resolver-api
 */

import { resolveHref } from '@/sanity/lib/utils'
import { defineDocuments, defineLocations } from 'sanity/presentation'

export const mainDocuments = defineDocuments([
  {
    route: '/post/:slug',
    filter: `_type == "post" && slug.current == $slug`,
  },
  {
    route: '/:slug',
    filter: `_type == "page" && slug.current == $slug`,
  },
])

export const locations = {
  settings: defineLocations({
    message: 'This document is used on all pages',
    tone: 'caution',
  }),
  home: defineLocations({
    message: 'This document is used to render the front page',
    tone: 'positive',
    locations: [{ title: 'Home', href: resolveHref('home')! }],
  }),
  post: defineLocations({
    select: { title: 'title', slug: 'slug.current' },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'Untitled',
          href: resolveHref('post', doc?.slug)!,
        },
      ],
    }),
  }),
  page: defineLocations({
    select: { title: 'title', slug: 'slug.current' },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'Untitled',
          href: resolveHref('page', doc?.slug)!,
        },
      ],
    }),
  }),
}
