import { Compass } from "lucide-react";

export default function PostFooter() {
	return (
		<footer className="border-t border-border bg-background px-5 py-6 md:px-6 md:py-8">
			<div className="mx-auto flex max-w-5xl items-center justify-between">
				<div className="flex items-center gap-2">
					<Compass className="h-5 w-5 text-primary" aria-hidden="true" />
					<span className="font-serif text-lg font-bold text-foreground">
						Reiseblog
					</span>
				</div>
				<p className="text-xs text-muted-foreground">
					Geschichten von unterwegs
				</p>
			</div>
		</footer>
	);
}
