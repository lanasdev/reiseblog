import type { Image } from 'sanity'
import type { PortableTextBlock } from 'next-sanity'

export interface SocialLink {
  _key: string
  platform:
    | 'instagram'
    | 'twitter'
    | 'linkedin'
    | 'youtube'
    | 'facebook'
    | 'github'
  url: string
}

export interface Settings {
  footer?: PortableTextBlock[]
  socialLinks?: SocialLink[]
}

export interface MilestoneItem {
  _key: string
  description?: string
  duration?: { start?: string; end?: string }
  image?: Image
  tags?: string[]
  title?: string
}

export interface CoverImageData {
  asset?: {
    metadata?: { lqip?: string; dimensions?: { width?: number; height?: number } }
  }
}

export interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  coverImage: string
  coverImageData?: CoverImageData
  date: string
  location: {
    name: string
    country: string
    lat: number
    lng: number
  }
  tags?: { _id: string; name: string; slug: string }[]
  readTime: number
  body?: PortableTextBlock[]
}
