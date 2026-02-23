'use client'

import { useIsPresentationTool } from 'next-sanity/hooks'
import { useEffect } from 'react'
import { toast } from 'sonner'

export function DraftModeToast({ action }: { action: () => Promise<void> }) {
  const isPresentationTool = useIsPresentationTool()

  useEffect(() => {
    if (isPresentationTool === false) {
      const toastId = toast('Draft Mode Enabled', {
        id: 'draft-mode-toast',
        description: 'Content is live, refreshing automatically',
        duration: Infinity,
        action: {
          label: 'Disable',
          onClick: () => toast.promise(action(), { loading: 'Disabling draft mode…' }),
        },
      })
      return () => toast.dismiss(toastId)
    }
  }, [action, isPresentationTool])

  return null
}
