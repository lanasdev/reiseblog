import { notFound } from "next/navigation";
import { Suspense } from "react";
import PostContent from "@/components/post/PostContent";
import PostFooter from "@/components/post/PostFooter";
import PostHero from "@/components/post/PostHero";
import PostPaywall from "@/components/post/PostPaywall";
import PostPageShell from "@/components/post/PostPageShell";
import RelatedPosts from "@/components/post/RelatedPosts";
import RelatedPostsSkeleton from "@/components/post/RelatedPostsSkeleton";
import { canViewPost, isSubscriberOnlyPost } from "@/lib/post-access";
import { getPostBySlug } from "@/lib/sanity";
import { hasSubscriberSession } from "@/lib/subscriber-session";
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
		if (!post) return { title: "Not Found" };
		const isSubscriber = await hasSubscriberSession();
		if (isSubscriberOnlyPost(post) && !isSubscriber) {
			return {
				title: `${post.title} - Subscriber only`,
				description: "This travel story is available to subscribers.",
			};
		}
		return {
			title: `${post.title} - Reiseblog`,
			description: post.excerpt,
		};
	} catch {
		const post = await getPostBySlug(slug);
		if (!post) return { title: "Not Found" };
		const isSubscriber = await hasSubscriberSession();
		if (isSubscriberOnlyPost(post) && !isSubscriber) {
			return {
				title: `${post.title} - Subscriber only`,
				description: "This travel story is available to subscribers.",
			};
		}
		return {
			title: `${post.title} - Reiseblog`,
			description: post.excerpt,
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
		post = data;
	} catch {
		post = await getPostBySlug(slug);
	}

	if (!post) notFound();
	const isSubscriber = await hasSubscriberSession();

	if (!canViewPost(post, isSubscriber)) {
		return (
			<PostPageShell>
				<PostHero post={post} />
				<PostPaywall post={post} />
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
