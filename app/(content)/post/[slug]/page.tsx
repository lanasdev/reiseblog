import { notFound } from "next/navigation";
import { Suspense } from "react";
import { appendFileSync } from "node:fs";
import PostContent from "@/components/post/PostContent";
import PostFooter from "@/components/post/PostFooter";
import PostHero from "@/components/post/PostHero";
import PostPaywall from "@/components/post/PostPaywall";
import PostPageShell from "@/components/post/PostPageShell";
import RelatedPosts from "@/components/post/RelatedPosts";
import RelatedPostsSkeleton from "@/components/post/RelatedPostsSkeleton";
import {
	applyResolvedAccessTier,
	canViewPost,
	isSubscriberOnlyPost,
} from "@/lib/post-access";
import { getViewerAccess } from "@/lib/auth-session";
import { getPostBySlug } from "@/lib/sanity";
import type { BlogPost } from "@/lib/types";
import { sanityFetch } from "@/sanity/lib/live";
import {
	PLACEHOLDER_IMAGE,
	postBySlugQuery,
} from "@/sanity/lib/queries";

interface Props {
	params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
	const { slug } = await params;

	// #region agent log
	appendFileSync("/opt/cursor/logs/debug.log", JSON.stringify({ hypothesisId: "D", location: "app/(content)/post/[slug]/page.tsx:generateMetadata", message: "generateMetadata entry", data: { slug }, timestamp: Date.now() }) + "\n");
	// #endregion

	try {
		const { data: post } = await sanityFetch({
			query: postBySlugQuery,
			params: { slug, placeholderImage: PLACEHOLDER_IMAGE },
			stega: false,
		});
		const resolvedPost = post ? applyResolvedAccessTier(post) : null;
		if (!resolvedPost) return { title: "Not Found" };
		return {
			title: `${resolvedPost.title} - Reiseblog`,
			description: resolvedPost.excerpt,
		};
	} catch (error) {
		// #region agent log
		appendFileSync("/opt/cursor/logs/debug.log", JSON.stringify({ hypothesisId: "D", location: "app/(content)/post/[slug]/page.tsx:generateMetadata", message: "generateMetadata fallback after error", data: { slug, error: error instanceof Error ? { name: error.name, message: error.message } : { type: typeof error } }, timestamp: Date.now() }) + "\n");
		// #endregion
		const post = await getPostBySlug(slug);
		const resolvedPost = post ? applyResolvedAccessTier(post) : null;
		if (!resolvedPost) return { title: "Not Found" };
		return {
			title: `${resolvedPost.title} - Reiseblog`,
			description: resolvedPost.excerpt,
		};
	}
}

export default async function PostPage({ params }: Props) {
	const { slug } = await params;

	let post: BlogPost | null = null;
	try {
		const { data } = await sanityFetch({
			query: postBySlugQuery,
			params: { slug, placeholderImage: PLACEHOLDER_IMAGE },
		});
		post = data ? applyResolvedAccessTier(data) : null;
	} catch {
		const fallbackPost = await getPostBySlug(slug);
		post = fallbackPost ? applyResolvedAccessTier(fallbackPost) : null;
	}

	if (!post) notFound();

	// #region agent log
	appendFileSync("/opt/cursor/logs/debug.log", JSON.stringify({ hypothesisId: "D", location: "app/(content)/post/[slug]/page.tsx:PostPage", message: "PostPage requesting viewer access", data: { slug, isSubscriberTier: isSubscriberOnlyPost(post) }, timestamp: Date.now() }) + "\n");
	// #endregion
	const viewer = await getViewerAccess();

	if (!canViewPost(post, viewer.isSubscriber)) {
		return (
			<PostPageShell>
				<PostPaywall post={post} />
				<PostFooter />
			</PostPageShell>
		);
	}

	return (
		<PostPageShell>
			<PostContent post={post} />
			<Suspense fallback={<RelatedPostsSkeleton />}>
				<RelatedPosts currentId={post._id} />
			</Suspense>
			<PostFooter />
		</PostPageShell>
	);
}
