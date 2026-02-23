import { draftMode } from 'next/headers'
import { lazy, Suspense } from 'react'
import type { OptimisticSortOrderProps } from './index.client'

const LazyOptimisticSortOrder = lazy(() => import('./index.client'))

export async function OptimisticSortOrder(
  props: Omit<OptimisticSortOrderProps, 'id'> & { id?: string | null }
) {
  const { children, id, path } = props

  if (!id) return children

  const { isEnabled } = await draftMode()
  if (!isEnabled) return children

  return (
    <Suspense fallback={children}>
      <LazyOptimisticSortOrder id={id} path={path}>
        {children}
      </LazyOptimisticSortOrder>
    </Suspense>
  )
}
