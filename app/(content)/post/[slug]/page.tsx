import { notFound } from "next/navigation";
import {
	applyResolvedAccessTier,
	canViewPost,
} from "@/lib/post-access";
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

	const viewer = { isSubscriber: false };

	if (!canViewPost(post, viewer.isSubscriber)) {
		return <main>{post.title}</main>;
	}

	return <main>{post.title}</main>;
}
