import ReiseblogHome from '@/components/reiseblog-home'
import { sanityFetch } from '@/sanity/lib/live'
import { PLACEHOLDER_IMAGE, postsQuery } from '@/sanity/lib/queries'
import { getPosts } from '@/lib/sanity'

export default async function HomePage() {
  try {
    const { data } = await sanityFetch({
      query: postsQuery,
      params: { placeholderImage: PLACEHOLDER_IMAGE },
    })
    const posts = data?.length ? data : await getPosts()
    return (
      <main>
        <ReiseblogHome posts={posts} />
      </main>
    )
  } catch {
    const posts = await getPosts()
    return (
      <main>
        <ReiseblogHome posts={posts} />
      </main>
    )
  }
}
