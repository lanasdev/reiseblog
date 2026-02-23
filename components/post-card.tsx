"use client"

import type { BlogPost } from "@/lib/types"
import { MapPin, Clock, Calendar } from "lucide-react"
import Link from "next/link"
import { motion } from "motion/react"

interface PostCardProps {
  post: BlogPost
  isActive: boolean
  onHover: (postId: string | null) => void
  onClick: (postId: string) => void
}

export default function PostCard({
  post,
  isActive,
  onHover,
  onClick,
}: PostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return (
    <motion.article
      className={`group relative rounded-lg border transition-colors duration-200 cursor-pointer overflow-hidden ${
        isActive
          ? "border-primary bg-card shadow-lg ring-1 ring-primary/20"
          : "border-border bg-card hover:border-primary/40 hover:shadow-md"
      }`}
      onMouseEnter={() => onHover(post._id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(post._id)}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick(post._id)
        }
      }}
      aria-label={`View post: ${post.title}`}
    >
      <div className="flex gap-3 p-3">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-foreground/5" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <div className="mb-1 flex items-center gap-1.5">
              <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium tracking-wide text-primary uppercase">
                {post.category}
              </span>
            </div>
            <h3 className="font-serif text-sm font-semibold leading-tight text-card-foreground line-clamp-2">
              {post.title}
            </h3>
          </div>

          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground md:gap-3">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {post.location.name}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" aria-hidden="true" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {post.readTime} min
            </span>
          </div>
        </div>
      </div>

      <Link
        href={`/post/${post.slug}`}
        className="absolute inset-0"
        tabIndex={-1}
        aria-hidden="true"
      >
        <span className="sr-only">Read {post.title}</span>
      </Link>
    </motion.article>
  )
}
