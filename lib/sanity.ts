import type { BlogPost } from "./types"
import { demoPosts } from "./demo-posts"
import { applyResolvedAccessTier } from "./post-access"
import { client } from "@/sanity/lib/client"
import {
  PLACEHOLDER_IMAGE,
  postBySlugQuery,
  postsQuery,
} from "@/sanity/lib/queries"

const sharedParams = { placeholderImage: PLACEHOLDER_IMAGE }

function normalizePost(post: BlogPost): BlogPost {
  return applyResolvedAccessTier(post)
}

export async function getPosts(): Promise<BlogPost[]> {
  try {
    const posts = await client.fetch(postsQuery, sharedParams)
    return posts?.length ? posts.map(normalizePost) : demoPosts.map(normalizePost)
  } catch {
    return demoPosts.map(normalizePost)
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = await client.fetch(postBySlugQuery, {
      slug,
      ...sharedParams,
    })
    const resolvedPost = post ?? demoPosts.find((p) => p.slug === slug) ?? null
    return resolvedPost ? normalizePost(resolvedPost) : null
  } catch {
    const fallbackPost = demoPosts.find((p) => p.slug === slug) ?? null
    return fallbackPost ? normalizePost(fallbackPost) : null
  }
}
