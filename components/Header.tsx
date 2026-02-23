import { CustomPortableText } from '@/components/CustomPortableText'
import type { PathSegment } from 'sanity'

interface HeaderProps {
  id: string | null
  type: string | null
  path: PathSegment[]
  centered?: boolean
  description?: unknown[] | null
  title?: string | null
}

export function Header({
  id,
  type,
  path,
  title,
  description,
  centered = false,
}: HeaderProps) {
  if (!description && !title) return null
  return (
    <div className={centered ? 'text-center' : 'w-5/6 lg:w-3/5'}>
      {title && (
        <div className="text-3xl font-extrabold tracking-tight md:text-5xl">
          {title}
        </div>
      )}
      {description && (
        <div className="mt-4 font-serif text-xl text-muted-foreground md:text-2xl">
          <CustomPortableText
            id={id}
            type={type}
            path={path}
            paragraphClasses="text-pretty"
            value={description as Parameters<typeof CustomPortableText>[0]['value']}
          />
        </div>
      )}
    </div>
  )
}
