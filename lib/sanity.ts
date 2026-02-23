import type { BlogPost } from "./types"
import { demoPosts } from "./demo-posts"
import { client } from "@/sanity/lib/client"
import {
  PLACEHOLDER_IMAGE,
  postBySlugQuery,
  postsQuery,
} from "@/sanity/lib/queries"

const sharedParams = { placeholderImage: PLACEHOLDER_IMAGE }

export async function getPosts(): Promise<BlogPost[]> {
  try {
    const posts = await client.fetch(postsQuery, sharedParams)
    return posts?.length ? posts : demoPosts
  } catch {
    return demoPosts
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = await client.fetch(postBySlugQuery, {
      slug,
      ...sharedParams,
    })
    return post ?? demoPosts.find((p) => p.slug === slug) ?? null
  } catch {
    return demoPosts.find((p) => p.slug === slug) ?? null
  }
}
