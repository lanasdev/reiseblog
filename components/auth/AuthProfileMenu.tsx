'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signOut, useSession } from '@/lib/auth-client'
import {
  CircleUserRound,
  LoaderCircle,
  LogOut,
  LogIn,
  ShieldCheck,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AuthProfileMenu() {
  const router = useRouter()
  const { data: session, isPending } = useSession()

  const displayName =
    session?.user?.name ?? session?.user?.email ?? 'Your account'

  async function handleSignOut() {
    await signOut()
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Open account menu"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-secondary"
        >
          {isPending ? (
            <LoaderCircle className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : (
            <CircleUserRound className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="space-y-0.5">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Account
          </p>
          <p className="truncate text-sm font-medium">{displayName}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {session?.user ? (
          <>
            <DropdownMenuItem asChild>
              <Link href="/subscribe">
                <ShieldCheck className="h-4 w-4" />
                Subscription
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem asChild>
            <Link href="/auth">
              <LogIn className="h-4 w-4" />
              Sign in / Create account
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
