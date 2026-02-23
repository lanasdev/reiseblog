import { ImageResponse } from 'next/og'
import { sanityFetch } from '@/sanity/lib/live'
import { pagesBySlugQuery } from '@/sanity/lib/queries'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

export const alt = 'Page'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Props = { params: Promise<{ slug: string }> }

export default async function Image({ params }: Props) {
  const { slug } = await params
  if (slug === 'post') notFound()

  const draft = await draftMode()
  const { data: page } = await sanityFetch({
    query: pagesBySlugQuery,
    params: { slug },
    stega: false,
  })

  if (!page?._id && !draft.isEnabled) notFound()

  const imageUrl = urlForOpenGraphImage(page?.ogImage)
  const title = page?.title ?? 'Untitled'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 48,
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.2,
            }}
          >
            {title}
          </div>
        </div>
        {imageUrl && (
          <div
            style={{
              width: 500,
              height: 630,
              display: 'flex',
              overflow: 'hidden',
            }}
          >
            {/* biome-ignore lint/performance/noImgElement: ImageResponse requires native img for external Sanity URLs */}
            <img
              src={imageUrl}
              alt=""
              width={500}
              height={630}
              style={{ objectFit: 'cover', width: 500, height: 630 }}
            />
          </div>
        )}
      </div>
    ),
    { ...size }
  )
}
