import ReiseblogHome from '@/components/reiseblog-home'
import ReiseblogHomeSkeleton from '@/components/reiseblog-home-skeleton'
import { hasSubscriberSession } from '@/lib/subscriber-session'
import { sanityFetch } from '@/sanity/lib/live'
import { PLACEHOLDER_IMAGE, postsQuery, settingsQuery } from '@/sanity/lib/queries'
import { getPosts } from '@/lib/sanity'
import { Suspense } from 'react'

async function HomePageContent() {
  const subscriberSessionPromise = hasSubscriberSession()

  try {
    const [{ data: posts }, { data: settings }, isSubscriber] = await Promise.all([
      sanityFetch({
        query: postsQuery,
        params: { placeholderImage: PLACEHOLDER_IMAGE },
      }),
      sanityFetch({ query: settingsQuery }),
      subscriberSessionPromise,
    ])
    const resolvedPosts = posts?.length ? posts : await getPosts()
    return (
      <ReiseblogHome
        posts={resolvedPosts}
        isSubscriber={isSubscriber}
        footer={settings?.footer}
        socialLinks={settings?.socialLinks}
      />
    )
  } catch {
    const [posts, isSubscriber] = await Promise.all([
      getPosts(),
      subscriberSessionPromise,
    ])
    return <ReiseblogHome posts={posts} isSubscriber={isSubscriber} />
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
