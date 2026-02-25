import ReiseblogHome from '@/components/reiseblog-home'
import ReiseblogHomeSkeleton from '@/components/reiseblog-home-skeleton'
import { sanityFetch } from '@/sanity/lib/live'
import { PLACEHOLDER_IMAGE, postsQuery, settingsQuery } from '@/sanity/lib/queries'
import { getPosts } from '@/lib/sanity'
import { Suspense } from 'react'

async function HomePageContent() {
  try {
    const [{ data: posts }, { data: settings }] = await Promise.all([
      sanityFetch({
        query: postsQuery,
        params: { placeholderImage: PLACEHOLDER_IMAGE },
      }),
      sanityFetch({ query: settingsQuery }),
    ])
    const resolvedPosts = posts?.length ? posts : await getPosts()
    return (
      <ReiseblogHome
        posts={resolvedPosts}
        footer={settings?.footer}
        socialLinks={settings?.socialLinks}
      />
    )
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
