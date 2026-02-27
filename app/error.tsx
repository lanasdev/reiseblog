"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function ErrorBoundary({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertCircle className="size-10" strokeWidth={1.5} />
        </div>
        <h1 className="font-serif text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          Etwas ist schiefgelaufen
        </h1>
        <p className="mt-3 text-muted-foreground">
          Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es
          erneut.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={() => reset()} variant="default">
            Erneut versuchen
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Zur Startseite</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
