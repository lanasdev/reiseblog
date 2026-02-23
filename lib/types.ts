import type { Image } from 'sanity'
import type { PortableTextBlock } from 'next-sanity'

export interface MilestoneItem {
  _key: string
  description?: string
  duration?: { start?: string; end?: string }
  image?: Image
  tags?: string[]
  title?: string
}

export interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  coverImage: string
  date: string
  location: {
    name: string
    country: string
    lat: number
    lng: number
  }
  category: string
  readTime: number
  body?: PortableTextBlock[]
}
