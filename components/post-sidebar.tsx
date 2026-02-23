"use client"

import { useState } from "react"
import type { BlogPost } from "@/lib/types"
import PostCard from "./post-card"
import { Compass, Search, X } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

interface PostSidebarProps {
  posts: BlogPost[]
  activePostId: string | null
  onPostHover: (postId: string | null) => void
  onPostClick: (postId: string) => void
}

export default function PostSidebar({
  posts,
  activePostId,
  onPostHover,
  onPostClick,
}: PostSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTag, setActiveTag] = useState("All")

  const allTags = [
    "All",
    ... [...new Set(posts.flatMap((p) => p.tags ?? []).map((t) => t.name))].sort(),
  ]

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.location.country.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag =
      activeTag === "All" || post.tags?.some((t) => t.name === activeTag)
    return matchesSearch && matchesTag
  })

  return (
    <aside className="flex h-full flex-col bg-background">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-border px-4 py-3 md:px-5 md:py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <Compass className="h-4 w-4 text-primary-foreground" aria-hidden="true" />
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold tracking-tight text-foreground md:text-xl">
              Reiseblog
            </h1>
            <p className="text-[11px] text-muted-foreground tracking-wide uppercase">
              Geschichten von unterwegs
            </p>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="flex-shrink-0 border-b border-border px-4 py-2.5 md:px-5 md:py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            type="text"
            placeholder="Suche nach Orten..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-secondary/50 pl-9 pr-8 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label="Search blog posts"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Tags */}
      <div className="flex-shrink-0 border-b border-border px-4 py-2.5 md:px-5 md:py-3">
        <div className="flex flex-nowrap gap-1.5 overflow-x-auto scrollbar-none md:flex-wrap">
          {allTags.map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                activeTag === tag
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Post count */}
      <div className="flex-shrink-0 px-4 py-2 md:px-5">
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
          {filteredPosts.length} {filteredPosts.length === 1 ? "Beitrag" : "Beitraege"}
        </p>
      </div>

      {/* Posts list */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 md:px-4">
        <AnimatePresence mode="popLayout">
          <div className="flex flex-col gap-2.5">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post._id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.04,
                  layout: { type: "spring", stiffness: 300, damping: 30 },
                }}
              >
                <PostCard
                  post={post}
                  isActive={activePostId === post._id}
                  onHover={onPostHover}
                  onClick={onPostClick}
                />
              </motion.div>
            ))}
            {filteredPosts.length === 0 && (
              <motion.div
                className="flex flex-col items-center justify-center py-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Compass className="mb-3 h-8 w-8 text-muted-foreground/50" aria-hidden="true" />
                <p className="text-sm font-medium text-muted-foreground">
                  Keine Beitraege gefunden
                </p>
                <p className="mt-1 text-xs text-muted-foreground/70">
                  Versuche einen anderen Suchbegriff
                </p>
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </div>
    </aside>
  )
}
