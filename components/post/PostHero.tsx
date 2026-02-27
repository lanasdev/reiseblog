"use client";

import { ArrowLeft, Calendar, Clock, Lock, MapPin } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";

const MotionImage = motion(Image);

export default function PostHero({ post }: { post: BlogPost }) {
	const formattedDate = new Date(post.date).toLocaleDateString("de-DE", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	return (
		<div className="relative h-[50vh] min-h-[360px] w-full overflow-hidden md:min-h-[400px]">
			<MotionImage
				src={post.coverImage}
				alt={post.title}
				fill
				sizes="100vw"
				priority
				className="object-cover"
				placeholder={
					post.coverImageData?.asset?.metadata?.lqip ? "blur" : "empty"
				}
				blurDataURL={post.coverImageData?.asset?.metadata?.lqip}
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
					<motion.div
						className="mb-2 flex flex-wrap gap-1.5 md:mb-3"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						{post.accessTier === "subscriber" && (
							<span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-xs font-medium text-amber-950 uppercase tracking-wider">
								<Lock className="h-3.5 w-3.5" />
								Subscriber
							</span>
						)}
						{post.tags?.map((tag) => (
							<span
								key={tag._id}
								className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground uppercase tracking-wider"
							>
								{tag.name}
							</span>
						))}
					</motion.div>
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
							<MapPin
								className="h-3.5 w-3.5 md:h-4 md:w-4"
								aria-hidden="true"
							/>
							{post.location.name}, {post.location.country}
						</span>
						<span className="flex items-center gap-1.5">
							<Calendar
								className="h-3.5 w-3.5 md:h-4 md:w-4"
								aria-hidden="true"
							/>
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
	);
}
