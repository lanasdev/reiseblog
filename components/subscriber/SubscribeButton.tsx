'use client'

import { LoaderCircle, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface SubscribeButtonProps {
  priceLabel?: string
  label?: string
  redirectTo?: string
  unauthenticatedMessage?: string
  className?: string
}

export default function SubscribeButton({
  priceLabel = '$28',
  label,
  redirectTo,
  unauthenticatedMessage = 'Please sign in to subscribe.',
  className,
}: SubscribeButtonProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const buttonLabel = label ?? `Subscribe for ${priceLabel}`

  async function handleSubscribe() {
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/subscriber/subscribe', {
        method: 'POST',
      })

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null

        if (response.status === 401) {
          setError(payload?.error ?? unauthenticatedMessage)
          return
        }

        setError(payload?.error ?? 'Unable to start subscription right now.')
        return
      }

      if (redirectTo) {
        router.replace(redirectTo)
      }
      router.refresh()
    } catch {
      setError('Network error while activating your subscription.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleSubscribe}
        disabled={isSubmitting}
        className={
          className ??
          'inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60'
        }
      >
        {isSubmitting ? (
          <LoaderCircle className="h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="h-4 w-4" />
        )}
        {buttonLabel}
      </button>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
