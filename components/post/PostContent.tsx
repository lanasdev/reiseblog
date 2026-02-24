import { PortableText } from "next-sanity";
import type { BlogPost } from "@/lib/types";
import PostMapSection from "./PostMapSection";

export default function PostContent({ post }: { post: BlogPost }) {
	return (
		<article className="mx-auto max-w-3xl px-5 py-8 md:px-8 md:py-12">
			<p className="font-serif text-lg leading-relaxed text-foreground/90 md:text-2xl">
				{post.excerpt}
			</p>

			<div className="my-8 h-px w-full bg-border md:my-10" />

			<div className="space-y-6 text-base leading-relaxed text-foreground/80 md:text-lg prose prose-lg max-w-none prose-headings:font-serif prose-p:leading-relaxed">
				{post.body && post.body.length > 0 ? (
					<PortableText
						value={post.body}
						components={{
							block: {
								h2: ({ children }) => (
									<h2 className="font-serif text-xl font-semibold text-foreground mt-8 mb-4">
										{children}
									</h2>
								),
								normal: ({ children }) => <p className="mb-4">{children}</p>,
								blockquote: ({ children }) => (
									<blockquote className="border-l-4 border-primary pl-4 italic my-4">
										{children}
									</blockquote>
								),
							},
							list: {
								bullet: ({ children }) => (
									<ul className="list-disc ml-4 space-y-1">{children}</ul>
								),
								number: ({ children }) => (
									<ol className="list-decimal ml-4 space-y-1">{children}</ol>
								),
							},
							marks: {
								link: ({ children, value }) => (
									<a
										href={value?.href}
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary underline hover:no-underline"
									>
										{children}
									</a>
								),
							},
						}}
					/>
				) : (
					<>
						<p>
							{`The journey to ${post.location.name} was one that had been on my list for years. There's something about
                arriving in a place you've only ever seen in photographs — the way reality fills in all the gaps your
                imagination left open.`}
						</p>
						<p>
							{`I spent my first day wandering without a map, letting the streets of ${post.location.name} guide me.
                This kind of aimless exploration is my favorite part of travel.`}
						</p>
					</>
				)}
			</div>

			<PostMapSection
				lat={post.location.lat}
				lng={post.location.lng}
				name={post.location.name}
			/>
		</article>
	);
}
