"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Compass, Search } from "lucide-react"

const MapLoadingPlaceholder = () => (
  <div className="flex h-full w-full items-center justify-center bg-secondary/30">
    <div className="flex flex-col items-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <p className="text-sm text-muted-foreground">Karte wird geladen...</p>
    </div>
  </div>
)

const SKELETON_POST_COUNT = 5

function PostCardSkeleton() {
  return (
    <div className="flex gap-3 rounded-lg border border-border p-3">
      <Skeleton className="h-20 w-20 flex-shrink-0 rounded-md" />
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Skeleton className="mb-1.5 h-3 w-16" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="mt-1 h-4 w-2/3" />
        </div>
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  )
}

export default function ReiseblogHomeSkeleton() {
  return (
    <div className="flex min-h-screen flex-col bg-background md:h-screen md:flex-row md:overflow-hidden">
      {/* Map: top on mobile, right on desktop — golden ratio (61.8%) */}
      <div className="order-1 flex h-[45vh] flex-shrink-0 flex-col border-b border-border md:order-2 md:h-full md:w-[61.8%] md:shrink-0 md:border-b-0">
        <MapLoadingPlaceholder />
      </div>

      {/* Sidebar skeleton: below map on mobile, left on desktop — golden ratio (38.2%) */}
      <div className="order-2 flex flex-1 flex-col border-r border-border md:order-1 md:h-full md:w-[38.2%] md:shrink-0 md:overflow-hidden">
        <header className="flex-shrink-0 border-b border-border px-4 py-3 md:px-5 md:py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <Compass className="h-4 w-4 text-primary-foreground" aria-hidden />
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold tracking-tight md:text-xl">
                Reiseblog
              </h1>
              <p className="text-[11px] text-muted-foreground tracking-wide uppercase">
                Geschichten von unterwegs
              </p>
            </div>
          </div>
        </header>

        <div className="flex-shrink-0 border-b border-border px-4 py-2.5 md:px-5 md:py-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Skeleton className="h-9 w-full rounded-md pl-9" />
          </div>
        </div>

        <div className="flex-shrink-0 border-b border-border px-4 py-2.5 md:px-5 md:py-3">
          <div className="flex gap-1.5">
            {["a", "b", "c", "d"].map((key) => (
              <Skeleton key={key} className="h-6 w-14 rounded-full" />
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 px-4 py-2 md:px-5">
          <Skeleton className="h-3 w-24" />
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-4 md:px-4">
          <div className="flex flex-col gap-2.5">
            {Array.from({ length: SKELETON_POST_COUNT }, (_, i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
