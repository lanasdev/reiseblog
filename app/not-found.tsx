import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Compass } from "lucide-react"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Compass className="size-10" strokeWidth={1.5} />
        </div>
        <h1 className="font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          404
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Diese Seite scheint sich verirrt zu haben – vielleicht ist sie noch
          unterwegs.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Die angeforderte Seite konnte nicht gefunden werden.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/">Zur Startseite</Link>
        </Button>
      </div>
    </main>
  )
}
