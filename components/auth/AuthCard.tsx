'use client'

import { LoaderCircle, LogIn, UserRoundPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type FormEvent, useState } from 'react'
import { signIn, signUp } from '@/lib/auth-client'
import { cn } from '@/lib/utils'

type Mode = 'sign-in' | 'sign-up'

interface AuthCardProps {
  initialMode?: Mode
  redirectTo?: string
}

export default function AuthCard({
  initialMode = 'sign-in',
  redirectTo = '/',
}: AuthCardProps) {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>(initialMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      if (mode === 'sign-up') {
        const result = await signUp.email({
          name: name.trim(),
          email: email.trim(),
          password,
        })

        if (result.error) {
          setError(result.error.message ?? 'Unable to create account.')
          return
        }
      } else {
        const result = await signIn.email({
          email: email.trim(),
          password,
        })

        if (result.error) {
          setError(result.error.message ?? 'Unable to sign in.')
          return
        }
      }

      router.replace(redirectTo)
      router.refresh()
    } catch {
      setError('Unexpected network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 md:p-8">
      <div className="mb-4 flex gap-2 rounded-md bg-secondary/60 p-1">
        <button
          type="button"
          onClick={() => setMode('sign-in')}
          className={cn(
            'flex-1 rounded-sm px-3 py-1.5 text-sm font-medium transition-colors',
            mode === 'sign-in'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setMode('sign-up')}
          className={cn(
            'flex-1 rounded-sm px-3 py-1.5 text-sm font-medium transition-colors',
            mode === 'sign-up'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Create account
        </button>
      </div>

      <form className="space-y-3" onSubmit={handleSubmit}>
        {mode === 'sign-up' && (
          <div className="space-y-1">
            <label
              htmlFor="auth-name"
              className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
            >
              Name
            </label>
            <input
              id="auth-name"
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Your name"
            />
          </div>
        )}

        <div className="space-y-1">
          <label
            htmlFor="auth-email"
            className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
          >
            Email
          </label>
          <input
            id="auth-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="auth-password"
            className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
          >
            Password
          </label>
          <input
            id="auth-password"
            type="password"
            required
            minLength={8}
            autoComplete={
              mode === 'sign-up' ? 'new-password' : 'current-password'
            }
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="At least 8 characters"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : mode === 'sign-up' ? (
            <UserRoundPlus className="h-4 w-4" />
          ) : (
            <LogIn className="h-4 w-4" />
          )}
          {mode === 'sign-up' ? 'Create account' : 'Sign in'}
        </button>

        {error && <p className="text-sm text-destructive">{error}</p>}
      </form>
    </div>
  )
}
