import { notFound } from "next/navigation";
import { Suspense } from "react";
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
	try {
		const { data: post } = await sanityFetch({
			query: postBySlugQuery,
			params: { slug, placeholderImage: PLACEHOLDER_IMAGE },
			stega: false,
		});
		const resolvedPost = post ? applyResolvedAccessTier(post) : null;
		if (!resolvedPost) return { title: "Not Found" };
		const viewer = await getViewerAccess();
		if (isSubscriberOnlyPost(resolvedPost) && !viewer.isSubscriber) {
			return {
				title: `${resolvedPost.title} - Subscriber only`,
				description: "This travel story is available to subscribers.",
			};
		}
		return {
			title: `${resolvedPost.title} - Reiseblog`,
			description: resolvedPost.excerpt,
		};
	} catch {
		const post = await getPostBySlug(slug);
		const resolvedPost = post ? applyResolvedAccessTier(post) : null;
		if (!resolvedPost) return { title: "Not Found" };
		const viewer = await getViewerAccess();
		if (isSubscriberOnlyPost(resolvedPost) && !viewer.isSubscriber) {
			return {
				title: `${resolvedPost.title} - Subscriber only`,
				description: "This travel story is available to subscribers.",
			};
		}
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
	const viewer = await getViewerAccess();

	if (!canViewPost(post, viewer.isSubscriber)) {
		return (
			<PostPageShell>
				<PostHero post={post} />
				<PostPaywall post={post} isAuthenticated={viewer.isAuthenticated} />
				<PostFooter />
			</PostPageShell>
		);
	}

	return (
		<PostPageShell>
			<PostHero post={post} />
			<PostContent post={post} />
			<Suspense fallback={<RelatedPostsSkeleton />}>
				<RelatedPosts currentId={post._id} />
			</Suspense>
			<PostFooter />
		</PostPageShell>
	);
}
