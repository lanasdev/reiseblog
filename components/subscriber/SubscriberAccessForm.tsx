'use client'

import { LoaderCircle, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type FormEvent, useState } from 'react'

interface SubscriberAccessFormProps {
  redirectTo?: string
  submitLabel?: string
  unauthenticatedMessage?: string
}

export default function SubscriberAccessForm({
  redirectTo,
  submitLabel = 'Unlock subscriber access',
  unauthenticatedMessage = 'Please sign in first to activate subscriber access.',
}: SubscriberAccessFormProps) {
  const router = useRouter()
  const [accessCode, setAccessCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/subscriber/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessCode }),
      })

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null
        if (response.status === 401) {
          setError(payload?.error ?? unauthenticatedMessage)
          return
        }
        setError(payload?.error ?? 'Unable to activate subscriber access.')
        setIsSubmitting(false)
        return
      }

      setAccessCode('')
      if (redirectTo) {
        router.replace(redirectTo)
      }
      router.refresh()
    } catch {
      setError('Network error while activating your subscriber access.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <label
        htmlFor="subscriber-access-code"
        className="block text-xs font-medium uppercase tracking-wider text-muted-foreground"
      >
        Subscriber access code
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="subscriber-access-code"
          type="password"
          autoComplete="off"
          required
          value={accessCode}
          onChange={(event) => setAccessCode(event.target.value)}
          placeholder="Enter your subscriber code"
          className="h-10 flex-1 rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <Lock className="h-4 w-4" />
          )}
          {submitLabel}
        </button>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </form>
  )
}
