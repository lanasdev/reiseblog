import { Skeleton } from "@/components/ui/skeleton";

export default function PostLoading() {
	return (
		<div className="min-h-screen bg-background">
			{/* Hero skeleton */}
			<Skeleton className="h-[50vh] min-h-[360px] w-full rounded-none md:min-h-[400px]" />

			{/* Content skeleton */}
			<div className="mx-auto max-w-3xl px-5 py-8 md:px-8 md:py-12">
				<Skeleton className="h-7 w-full md:h-8" />
				<Skeleton className="mt-2 h-7 w-3/4 md:h-8" />

				<div className="my-8 h-px w-full bg-border md:my-10" />

				<div className="space-y-4">
					<Skeleton className="h-5 w-full" />
					<Skeleton className="h-5 w-full" />
					<Skeleton className="h-5 w-5/6" />
					<Skeleton className="h-5 w-full" />
					<Skeleton className="h-5 w-4/5" />
					<Skeleton className="h-5 w-full" />
					<Skeleton className="h-5 w-2/3" />
				</div>

				{/* Map skeleton */}
				<div className="mt-10 md:mt-12">
					<Skeleton className="mb-4 h-6 w-24" />
					<Skeleton className="h-56 w-full rounded-lg md:h-64" />
				</div>
			</div>
		</div>
	);
}
