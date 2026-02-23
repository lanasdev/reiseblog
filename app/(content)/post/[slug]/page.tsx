import PostDetail from '@/components/post-detail'
import { getPostBySlug, getPosts } from '@/lib/sanity'
import { sanityFetch } from '@/sanity/lib/live'
import {
  PLACEHOLDER_IMAGE,
  postBySlugQuery,
  postsQuery,
} from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const { data } = await sanityFetch({
      query: postsQuery,
      params: { placeholderImage: PLACEHOLDER_IMAGE },
      stega: false,
      perspective: 'published',
    })
    return (data ?? []).map((post) => ({ slug: post.slug }))
  } catch {
    const posts = await getPosts()
    return posts.map((post) => ({ slug: post.slug }))
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  try {
    const { data: post } = await sanityFetch({
      query: postBySlugQuery,
      params: { slug, placeholderImage: PLACEHOLDER_IMAGE },
      stega: false,
    })
    if (!post) return { title: 'Not Found' }
    return {
      title: `${post.title} - Reiseblog`,
      description: post.excerpt,
    }
  } catch {
    const post = await getPostBySlug(slug)
    if (!post) return { title: 'Not Found' }
    return {
      title: `${post.title} - Reiseblog`,
      description: post.excerpt,
    }
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  let post

  try {
    const { data } = await sanityFetch({
      query: postBySlugQuery,
      params: { slug, placeholderImage: PLACEHOLDER_IMAGE },
    })
    post = data
  } catch {
    post = await getPostBySlug(slug)
  }

  if (!post) notFound()

  let relatedPosts
  try {
    const { data } = await sanityFetch({
      query: postsQuery,
      params: { placeholderImage: PLACEHOLDER_IMAGE },
      stega: false,
    })
    relatedPosts = (data ?? [])
      .filter((p: { _id: string }) => p._id !== post._id)
      .slice(0, 3)
  } catch {
    const allPosts = await getPosts()
    relatedPosts = allPosts
      .filter((p) => p._id !== post._id)
      .slice(0, 3)
  }

  return <PostDetail post={post} relatedPosts={relatedPosts} />
}
