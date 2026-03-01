'use client'

import { LoaderCircle, Sparkles } from 'lucide-react'
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
  redirectTo = '/',
  unauthenticatedMessage = 'Please sign in to subscribe.',
  className,
}: SubscribeButtonProps) {
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const buttonLabel = label ?? `Subscribe for ${priceLabel}`

  async function handleSubscribe() {
    setError(null)
    setIsSubmitting(true)

    try {
      const params = new URLSearchParams()
      if (redirectTo && redirectTo !== '/') {
        params.set('redirect', redirectTo)
      }
      const url = `/api/stripe/create-checkout-session${params.toString() ? `?${params}` : ''}`
      const response = await fetch(url, { method: 'POST' })

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null

        if (response.status === 401) {
          setError(payload?.error ?? unauthenticatedMessage)
          return
        }

        setError(payload?.error ?? 'Unable to start checkout. Please try again.')
        return
      }

      const { url: checkoutUrl } = (await response.json()) as { url?: string }
      if (checkoutUrl) {
        window.location.href = checkoutUrl
        return
      }
      setError('Unable to start checkout.')
    } catch {
      setError('Network error. Please try again.')
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
