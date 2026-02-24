import { notFound } from "next/navigation";
import { Suspense } from "react";
import PostContent from "@/components/post/PostContent";
import PostFooter from "@/components/post/PostFooter";
import PostHero from "@/components/post/PostHero";
import PostPageShell from "@/components/post/PostPageShell";
import RelatedPosts from "@/components/post/RelatedPosts";
import RelatedPostsSkeleton from "@/components/post/RelatedPostsSkeleton";
import { getPostBySlug, getPosts } from "@/lib/sanity";
import type { BlogPost } from "@/lib/types";
import { sanityFetch } from "@/sanity/lib/live";
import {
	PLACEHOLDER_IMAGE,
	postBySlugQuery,
	slugsByTypeQuery,
} from "@/sanity/lib/queries";

interface Props {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	try {
		const { data } = await sanityFetch({
			query: slugsByTypeQuery,
			params: { type: "post" },
			stega: false,
			perspective: "published",
		});
		return (data ?? []).map((post: { slug: string }) => ({ slug: post.slug }));
	} catch {
		const posts = await getPosts();
		return posts.map((post) => ({ slug: post.slug }));
	}
}

export async function generateMetadata({ params }: Props) {
	const { slug } = await params;
	try {
		const { data: post } = await sanityFetch({
			query: postBySlugQuery,
			params: { slug, placeholderImage: PLACEHOLDER_IMAGE },
			stega: false,
		});
		if (!post) return { title: "Not Found" };
		return {
			title: `${post.title} - Reiseblog`,
			description: post.excerpt,
		};
	} catch {
		const post = await getPostBySlug(slug);
		if (!post) return { title: "Not Found" };
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
