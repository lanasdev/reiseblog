import { sanityFetch } from "@/sanity/lib/live";
import { PLACEHOLDER_IMAGE, relatedPostsQuery } from "@/sanity/lib/queries";
import { applyResolvedAccessTier } from "@/lib/post-access";
import RelatedPostCard from "./RelatedPostCard";

export default async function RelatedPosts({
	currentId,
}: {
	currentId: string;
}) {
	const { data: relatedPosts } = await sanityFetch({
		query: relatedPostsQuery,
		params: { currentId, placeholderImage: PLACEHOLDER_IMAGE },
	});

	const resolvedRelatedPosts =
		relatedPosts?.map(applyResolvedAccessTier) ?? [];

	if (resolvedRelatedPosts.length === 0) return null;

	return (
		<section className="border-t border-border bg-secondary/30 px-5 py-10 md:px-8 md:py-12">
			<div className="mx-auto max-w-5xl">
				<h2 className="mb-6 font-serif text-xl font-bold text-foreground md:mb-8 md:text-2xl">
					Weitere Reiseberichte
				</h2>
				<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
					{resolvedRelatedPosts.map((related) => (
						<RelatedPostCard key={related._id} post={related} />
					))}
				</div>
			</div>
		</section>
	);
}
