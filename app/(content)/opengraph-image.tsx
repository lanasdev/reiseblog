import { ImageResponse } from 'next/og'
import { sanityFetch } from '@/sanity/lib/live'
import { homePageQuery, settingsQuery } from '@/sanity/lib/queries'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'

export const alt = 'Reiseblog - Travel Stories From Around the World'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const [{ data: settings }, { data: homePage }] = await Promise.all([
    sanityFetch({ query: settingsQuery, stega: false }),
    sanityFetch({ query: homePageQuery, stega: false }),
  ])

  const imageUrl = urlForOpenGraphImage(settings?.ogImage)
  const title = homePage?.title ?? 'Reiseblog'

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
          <div
            style={{
              fontSize: 24,
              color: 'rgba(255,255,255,0.8)',
              marginTop: 16,
            }}
          >
            Travel stories from around the globe
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
