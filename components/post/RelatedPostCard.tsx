import { Lock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface RelatedPostCardProps {
	post: {
		_id: string;
		title: string;
		slug: string;
		accessTier: "free" | "subscriber";
		coverImage: string;
		coverImageData?: {
			asset?: {
				metadata?: { lqip?: string };
			};
		};
		location: { name: string };
		tags?: { _id: string; name: string }[];
	};
}

export default function RelatedPostCard({ post }: RelatedPostCardProps) {
	return (
		<Link
			href={`/post/${post.slug}`}
			className="group block overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-md"
		>
			<div className="relative h-36 overflow-hidden md:h-40">
				<Image
					src={post.coverImage}
					alt={post.title}
					fill
					sizes="(max-width: 768px) 100vw, 33vw"
					className="object-cover transition-transform duration-500 group-hover:scale-110"
					placeholder={
						post.coverImageData?.asset?.metadata?.lqip ? "blur" : "empty"
					}
					blurDataURL={post.coverImageData?.asset?.metadata?.lqip}
				/>
			</div>
			<div className="p-3 md:p-4">
				<div className="flex flex-wrap gap-1">
					{post.accessTier === "subscriber" && (
						<span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-700 uppercase tracking-wider">
							<Lock className="h-3 w-3" />
							Subscriber
						</span>
					)}
					{post.tags?.map((tag) => (
						<span
							key={tag._id}
							className="text-[10px] font-medium text-primary uppercase tracking-wider"
						>
							{tag.name}
						</span>
					))}
				</div>
				<h3 className="mt-1 font-serif text-sm font-semibold text-card-foreground line-clamp-2">
					{post.title}
				</h3>
				<p className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
					<MapPin className="h-3 w-3" aria-hidden="true" />
					{post.location.name}
				</p>
			</div>
		</Link>
	);
}
