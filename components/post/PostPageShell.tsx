"use client";

import { motion } from "motion/react";

export default function PostPageShell({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<motion.div
			className="min-h-screen bg-background"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.4, ease: "easeOut" }}
		>
			{children}
		</motion.div>
	);
}
