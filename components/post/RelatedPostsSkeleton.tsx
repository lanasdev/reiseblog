import { Skeleton } from "@/components/ui/skeleton";

export default function RelatedPostsSkeleton() {
	return (
		<section className="border-t border-border bg-secondary/30 px-5 py-10 md:px-8 md:py-12">
			<div className="mx-auto max-w-5xl">
				<Skeleton className="mb-6 h-7 w-56 md:mb-8" />
				<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
					{["a", "b", "c"].map((key) => (
						<div
							key={key}
							className="overflow-hidden rounded-lg border border-border bg-card"
						>
							<Skeleton className="h-36 w-full rounded-none md:h-40" />
							<div className="p-3 md:p-4">
								<Skeleton className="h-3 w-16" />
								<Skeleton className="mt-2 h-4 w-full" />
								<Skeleton className="mt-2 h-3 w-24" />
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
