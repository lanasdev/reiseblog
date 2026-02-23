'use client'

import type { StudioPathLike } from '@sanity/client/csm'
import { get } from '@sanity/util/paths'
import { useOptimistic } from 'next-sanity/hooks'
import { Children, isValidElement } from 'react'

export interface OptimisticSortOrderProps {
  children: React.ReactNode
  id: string
  path: StudioPathLike
}

export default function OptimisticSortOrder(props: OptimisticSortOrderProps) {
  const { children, id, path } = props
  const childrenLength = Children.count(children)

  const optimistic = useOptimistic<
    null | string[],
    { id: string; document: Record<string, unknown> }
  >(null, (state, action) => {
    if (action.id !== id) return state
    const value = get(action.document, path) as { _key: string }[] | undefined
    if (!value) return state
    return value.map(({ _key }) => _key)
  })

  if (optimistic) {
    if (optimistic.length < childrenLength) return children

    const cache = new Map<string, React.ReactNode>()
    Children.forEach(children, (child) => {
      if (!isValidElement(child) || !child.key) return
      cache.set(child.key, child)
    })
    return optimistic.map((key) => cache.get(key))
  }

  return children
}
