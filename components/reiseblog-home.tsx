"use client"

import { useState, useCallback } from "react"
import dynamic from "next/dynamic"
import type { BlogPost } from "@/lib/types"
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
}

export default function ReiseblogHome({ posts }: ReiseblogHomeProps) {
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
    <>
      {/* Desktop: golden ratio side-by-side */}
      <div className="hidden h-screen w-screen overflow-hidden bg-background md:flex">
        {/* Sidebar - Golden ratio: 38.2% */}
        <div className="flex h-full w-[38.2%] flex-col border-r border-border">
          <PostSidebar
            posts={posts}
            activePostId={activePostId}
            onPostHover={handlePostHover}
            onPostClick={handlePostClick}
          />
        </div>

        {/* Map - Golden ratio: 61.8% */}
        <div className="flex h-full w-[61.8%]">
          <TravelMap
            posts={posts}
            activePostId={activePostId}
            onPinClick={handlePinClick}
          />
        </div>
      </div>

      {/* Mobile: stacked layout - map on top, posts below */}
      <div className="flex min-h-screen flex-col bg-background md:hidden">
        {/* Map section - fills roughly top 45% of viewport */}
        <div className="relative h-[45vh] w-full flex-shrink-0 border-b border-border">
          <TravelMap
            posts={posts}
            activePostId={activePostId}
            onPinClick={handlePinClick}
          />
        </div>

        {/* Post list section - scrollable below */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <PostSidebar
            posts={posts}
            activePostId={activePostId}
            onPostHover={handlePostHover}
            onPostClick={handlePostClick}
          />
        </div>
      </div>
    </>
  )
}
