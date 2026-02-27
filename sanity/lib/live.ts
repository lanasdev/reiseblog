import { defineLive } from 'next-sanity/live'
import { client } from './client'
import { token } from './token'

const liveToken = token?.trim() || false

export const { SanityLive, sanityFetch } = defineLive({
  client,
  serverToken: liveToken,
  browserToken: liveToken,
})
