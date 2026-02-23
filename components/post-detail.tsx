"use client"

import type { BlogPost } from "@/lib/types"
import {
  ArrowLeft,
  MapPin,
  Clock,
  Calendar,
  Compass,
} from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { motion } from "motion/react"

const PostMap = dynamic(() => import("./post-map"), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full animate-pulse rounded-lg bg-secondary" />
  ),
})

interface PostDetailProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}

export default function PostDetail({ post, relatedPosts }: PostDetailProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[360px] w-full overflow-hidden md:min-h-[400px]">
        <motion.img
          src={post.coverImage}
          alt={post.title}
          className="h-full w-full object-cover"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />

        {/* Back button */}
        <motion.div
          className="absolute left-0 top-0 p-4 md:p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full bg-card/80 px-3 py-2 text-sm font-medium text-card-foreground backdrop-blur-sm transition-colors hover:bg-card md:px-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Zurueck zur Karte</span>
            <span className="sm:hidden">Zurueck</span>
          </Link>
        </motion.div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-12">
          <div className="mx-auto max-w-3xl">
            <motion.span
              className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground uppercase tracking-wider md:mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {post.category}
            </motion.span>
            <motion.h1
              className="font-serif text-2xl font-bold leading-tight text-primary-foreground sm:text-3xl md:text-5xl text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {post.title}
            </motion.h1>
            <motion.div
              className="mt-3 flex flex-wrap items-center gap-3 text-xs text-primary-foreground/80 sm:text-sm md:mt-4 md:gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden="true" />
                {post.location.name}, {post.location.country}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden="true" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden="true" />
                {post.readTime} Min. Lesezeit
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.article
        className="mx-auto max-w-3xl px-5 py-8 md:px-8 md:py-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p className="font-serif text-lg leading-relaxed text-foreground/90 md:text-2xl">
          {post.excerpt}
        </p>

        <div className="my-8 h-px w-full bg-border md:my-10" />

        <div className="space-y-6 text-base leading-relaxed text-foreground/80 md:text-lg">
          <p>
            {`The journey to ${post.location.name} was one that had been on my list for years. There's something about 
            arriving in a place you've only ever seen in photographs — the way reality fills in all the gaps your 
            imagination left open. The light is different, the air carries unfamiliar scents, and every corner holds 
            the promise of a story waiting to be told.`}
          </p>
          <p>
            {`I spent my first day wandering without a map, letting the streets of ${post.location.name} guide me. 
            This kind of aimless exploration is my favorite part of travel — the moments between plans, when you 
            stumble upon a hidden courtyard or a tiny cafe where the owner insists you try something you can't pronounce.`}
          </p>
          <p>
            {`What struck me most about ${post.location.country} was the way its people carry their history. 
            It's not locked behind glass in museums (though those are worth visiting too) — it lives in the daily 
            rituals, the food, the architecture that has weathered centuries. Every building, every dish, every 
            greeting carries the weight and warmth of generations.`}
          </p>
        </div>

        {/* Map */}
        <motion.div
          className="mt-10 md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">
            Standort
          </h2>
          <div className="h-56 overflow-hidden rounded-lg border border-border md:h-64">
            <PostMap
              lat={post.location.lat}
              lng={post.location.lng}
              name={post.location.name}
            />
          </div>
        </motion.div>
      </motion.article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-border bg-secondary/30 px-5 py-10 md:px-8 md:py-12">
          <div className="mx-auto max-w-5xl">
            <motion.h2
              className="mb-6 font-serif text-xl font-bold text-foreground md:mb-8 md:text-2xl"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Weitere Reiseberichte
            </motion.h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
              {relatedPosts.map((related, i) => (
                <motion.div
                  key={related._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={`/post/${related.slug}`}
                    className="group block overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-md"
                  >
                    <div className="relative h-36 overflow-hidden md:h-40">
                      <img
                        src={related.coverImage}
                        alt={related.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3 md:p-4">
                      <span className="text-[10px] font-medium text-primary uppercase tracking-wider">
                        {related.category}
                      </span>
                      <h3 className="mt-1 font-serif text-sm font-semibold text-card-foreground line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        {related.location.name}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border bg-background px-5 py-6 md:px-6 md:py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-primary" aria-hidden="true" />
            <span className="font-serif text-lg font-bold text-foreground">
              Reiseblog
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Geschichten von unterwegs
          </p>
        </div>
      </footer>
    </motion.div>
  )
}
