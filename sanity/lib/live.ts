import { defineLive } from 'next-sanity/live'
import { client } from './client'
import { token } from './token'

export const { SanityLive, sanityFetch } = defineLive({
  client,
  serverToken: token ?? undefined,
  browserToken: token ?? undefined,
})
