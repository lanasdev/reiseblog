import { getPostBySlug, getPosts } from "@/lib/sanity"
import { notFound } from "next/navigation"
import PostDetail from "@/components/post-detail"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: "Not Found" }
  return {
    title: `${post.title} - Reiseblog`,
    description: post.excerpt,
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const allPosts = await getPosts()
  const relatedPosts = allPosts
    .filter((p) => p._id !== post._id)
    .slice(0, 3)

  return <PostDetail post={post} relatedPosts={relatedPosts} />
}
