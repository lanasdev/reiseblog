"use client"

import { useCallback, useState } from "react"
import dynamic from "next/dynamic"
import type { BlogPost, SocialLink } from "@/lib/types"
import type { PortableTextBlock } from "next-sanity"
import PostSidebar from "./post-sidebar"

const TravelMap = dynamic(() => import("./travel-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-secondary/30">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Karte wird geladen...</p>
      </div>
    </div>
  ),
})

interface ReiseblogHomeProps {
  posts: BlogPost[]
  footer?: PortableTextBlock[]
  socialLinks?: SocialLink[]
}

export default function ReiseblogHome({
  posts,
  footer,
  socialLinks,
}: ReiseblogHomeProps) {
  const [activePostId, setActivePostId] = useState<string | null>(null)

  const handlePinClick = useCallback((postId: string) => {
    setActivePostId((prev) => (prev === postId ? null : postId))
  }, [])

  const handlePostHover = useCallback((postId: string | null) => {
    setActivePostId(postId)
  }, [])

  const handlePostClick = useCallback((postId: string) => {
    setActivePostId(postId)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-background md:h-screen md:flex-row md:overflow-hidden">
      {/* Map: top on mobile, right on desktop — golden ratio (61.8%) */}
      <div className="order-1 flex h-[45vh] flex-shrink-0 flex-col border-b border-border md:order-2 md:h-full md:w-[61.8%] md:shrink-0 md:border-b-0">
        <TravelMap
          posts={posts}
          activePostId={activePostId}
          onPinClick={handlePinClick}
        />
      </div>

      {/* Sidebar: below map on mobile, left on desktop — golden ratio (38.2%) */}
      <div className="order-2 flex flex-1 flex-col border-r border-border md:order-1 md:h-full md:w-[38.2%] md:shrink-0 md:overflow-hidden">
        <PostSidebar
          posts={posts}
          activePostId={activePostId}
          onPostHover={handlePostHover}
          onPostClick={handlePostClick}
          footer={footer}
          socialLinks={socialLinks}
        />
      </div>
    </div>
  )
}
