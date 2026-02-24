"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";

const PostMap = dynamic(() => import("../post-map"), {
	ssr: false,
	loading: () => (
		<div className="h-64 w-full animate-pulse rounded-lg bg-secondary" />
	),
});

export default function PostMapSection({
	lat,
	lng,
	name,
}: {
	lat: number;
	lng: number;
	name: string;
}) {
	return (
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
				<PostMap lat={lat} lng={lng} name={name} />
			</div>
		</motion.div>
	);
}
