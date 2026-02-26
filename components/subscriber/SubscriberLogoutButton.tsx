'use client'

import { cn } from '@/lib/utils'
import { LoaderCircle, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface SubscriberLogoutButtonProps {
  className?: string
  label?: string
  redirectTo?: string
}

export default function SubscriberLogoutButton({
  className,
  label = 'Logout',
  redirectTo,
}: SubscriberLogoutButtonProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleLogout() {
    setIsSubmitting(true)

    try {
      await fetch('/api/subscriber/logout', {
        method: 'POST',
      })

      if (redirectTo) {
        router.replace(redirectTo)
      }
      router.refresh()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isSubmitting}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-card-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60',
        className
      )}
    >
      {isSubmitting ? (
        <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <LogOut className="h-3.5 w-3.5" />
      )}
      {label}
    </button>
  )
}
