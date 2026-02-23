import { createClient } from "next-sanity"
import type { BlogPost } from "./types"
import { demoPosts } from "./demo-posts"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: true,
    })
  : null

const postsQuery = `*[_type == "post"] | order(date desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "coverImage": coverImage.asset->url,
  date,
  location,
  category,
  readTime
}`

const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "coverImage": coverImage.asset->url,
  date,
  location,
  category,
  readTime,
  body
}`

export async function getPosts(): Promise<BlogPost[]> {
  if (!sanityClient) {
    return demoPosts
  }
  try {
    const posts = await sanityClient.fetch(postsQuery)
    return posts?.length ? posts : demoPosts
  } catch {
    return demoPosts
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!sanityClient) {
    return demoPosts.find((p) => p.slug === slug) ?? null
  }
  try {
    const post = await sanityClient.fetch(postBySlugQuery, { slug })
    return post ?? demoPosts.find((p) => p.slug === slug) ?? null
  } catch {
    return demoPosts.find((p) => p.slug === slug) ?? null
  }
}
