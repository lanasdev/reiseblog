import AuthCard from '@/components/auth/AuthCard'
import { getViewerAccess } from '@/lib/auth-session'
import { ShieldCheck } from 'lucide-react'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Account',
  description: 'Sign in to manage subscriber content access.',
}

interface AuthPageProps {
  searchParams: Promise<{
    mode?: string
    next?: string
  }>
}

function getSafeRedirectTarget(nextTarget: string | undefined): string {
  if (!nextTarget || !nextTarget.startsWith('/')) return '/'
  if (nextTarget.startsWith('//')) return '/'
  return nextTarget
}

function getMode(modeParam: string | undefined): 'sign-in' | 'sign-up' {
  return modeParam === 'sign-up' ? 'sign-up' : 'sign-in'
}

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const { mode, next } = await searchParams
  const redirectTarget = getSafeRedirectTarget(next)
  const viewer = await getViewerAccess()

  if (viewer.isAuthenticated) {
    redirect(redirectTarget)
  }

  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-4 px-5 py-10 md:px-8 md:py-14">
      <div className="space-y-2 text-center">
        <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
          <ShieldCheck className="h-3.5 w-3.5" />
          Secure account access
        </p>
        <h1 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
          Continue to subscriber features
        </h1>
      </div>

      <AuthCard initialMode={getMode(mode)} redirectTo={redirectTarget} />
    </main>
  )
}
