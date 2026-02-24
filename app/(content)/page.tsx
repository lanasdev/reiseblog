import ReiseblogHome from '@/components/reiseblog-home'
import ReiseblogHomeSkeleton from '@/components/reiseblog-home-skeleton'
import { sanityFetch } from '@/sanity/lib/live'
import { PLACEHOLDER_IMAGE, postsQuery } from '@/sanity/lib/queries'
import { getPosts } from '@/lib/sanity'
import { Suspense } from 'react'

async function HomePageContent() {
  try {
    const { data } = await sanityFetch({
      query: postsQuery,
      params: { placeholderImage: PLACEHOLDER_IMAGE },
    })
    const posts = data?.length ? data : await getPosts()
    return <ReiseblogHome posts={posts} />
  } catch {
    const posts = await getPosts()
    return <ReiseblogHome posts={posts} />
  }
}

export default function HomePage() {
  return (
    <main>
      <Suspense fallback={<ReiseblogHomeSkeleton />}>
        <HomePageContent />
      </Suspense>
    </main>
  )
}
