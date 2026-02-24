import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
	return (
		<div className="flex h-screen">
			{/* Sidebar skeleton */}
			<div className="w-full border-r border-border bg-background p-4 md:w-[420px]">
				<Skeleton className="mb-6 h-8 w-40" />
				<div className="space-y-3">
					{["a", "b", "c", "d", "e"].map((key) => (
						<div
							key={key}
							className="flex gap-3 rounded-lg border border-border p-3"
						>
							<Skeleton className="h-20 w-20 flex-shrink-0 rounded-md" />
							<div className="flex flex-1 flex-col justify-between">
								<div>
									<Skeleton className="mb-1.5 h-3 w-16" />
									<Skeleton className="h-4 w-full" />
									<Skeleton className="mt-1 h-4 w-2/3" />
								</div>
								<Skeleton className="h-3 w-32" />
							</div>
						</div>
					))}
				</div>
			</div>
			{/* Map skeleton */}
			<div className="hidden flex-1 md:block">
				<Skeleton className="h-full w-full rounded-none" />
			</div>
		</div>
	);
}
