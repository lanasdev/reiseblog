import { getPosts } from "@/lib/sanity"
import ReiseblogHome from "@/components/reiseblog-home"

export default async function HomePage() {
  const posts = await getPosts()

  return (
    <main>
      <ReiseblogHome posts={posts} />
    </main>
  )
}
