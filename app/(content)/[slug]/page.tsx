import { CustomPortableText } from '@/components/CustomPortableText'
import { Header } from '@/components/Header'
import { sanityFetch } from '@/sanity/lib/live'
import { pagesBySlugQuery, slugsByTypeQuery } from '@/sanity/lib/queries'
import { toPlainText, type PortableTextBlock } from 'next-sanity'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  try {
    const { slug } = await params
    const { data: page } = await sanityFetch({
      query: pagesBySlugQuery,
      params: { slug },
      stega: false,
    })
    return {
      title: page?.title,
      description: page?.overview ? toPlainText(page.overview) : undefined,
    }
  } catch {
    return {}
  }
}

export async function generateStaticParams() {
  try {
    const { data } = await sanityFetch({
      query: slugsByTypeQuery,
      params: { type: 'page' },
      stega: false,
      perspective: 'published',
    })
    return data ?? []
  } catch {
    return []
  }
}

export default async function PageSlugRoute({ params }: Props) {
  const { slug } = await params

  if (slug === 'post') notFound()

  const { data } = await sanityFetch({
    query: pagesBySlugQuery,
    params: { slug },
  })

  const draft = await draftMode()
  if (!data?._id && !draft.isEnabled) notFound()

  const { body, overview, title } = data ?? {}

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 md:px-8">
      <div className="mb-14">
        <Header
          id={data?._id ?? null}
          type={data?._type ?? null}
          path={['overview']}
          title={title ?? (data?._id ? 'Untitled' : '404 Page Not Found')}
          description={overview}
        />

        {body && (
          <CustomPortableText
            id={data?._id ?? null}
            type={data?._type ?? null}
            path={['body']}
            paragraphClasses="font-serif text-xl text-muted-foreground"
            value={body as unknown as PortableTextBlock[]}
          />
        )}
      </div>
    </div>
  )
}
