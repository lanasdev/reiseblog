"use client"

import { useState, useCallback, useEffect } from "react"
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

const MD_BREAKPOINT = 768

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(() => {
    if (typeof window === "undefined") {
      return null
    }
    return window.matchMedia(`(min-width: ${MD_BREAKPOINT}px)`).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${MD_BREAKPOINT}px)`)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [])

  return isDesktop
}

interface ReiseblogHomeProps {
  posts: BlogPost[]
}

export default function ReiseblogHome({ posts }: ReiseblogHomeProps) {
  const [activePostId, setActivePostId] = useState<string | null>(null)
  const isDesktop = useIsDesktop()

  const handlePinClick = useCallback((postId: string) => {
    setActivePostId((prev) => (prev === postId ? null : postId))
  }, [])

  const handlePostHover = useCallback((postId: string | null) => {
    setActivePostId(postId)
  }, [])

  const handlePostClick = useCallback((postId: string) => {
    setActivePostId(postId)
  }, [])

  const map = (
    <TravelMap
      posts={posts}
      activePostId={activePostId}
      onPinClick={handlePinClick}
    />
  )

  const sidebar = (
    <PostSidebar
      posts={posts}
      activePostId={activePostId}
      onPostHover={handlePostHover}
      onPostClick={handlePostClick}
    />
  )

  if (isDesktop === null) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Karte wird geladen...</p>
        </div>
      </div>
    )
  }

  if (isDesktop) {
    return (
      <div className="flex h-screen w-screen overflow-hidden bg-background">
        <div className="flex h-full w-[38.2%] flex-col border-r border-border">
          {sidebar}
        </div>
        <div className="flex h-full w-[61.8%]">
          {map}
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="relative h-[45vh] w-full flex-shrink-0 border-b border-border">
        {map}
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        {sidebar}
      </div>
    </div>
  )
}
