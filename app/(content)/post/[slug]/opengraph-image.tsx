import { ImageResponse } from 'next/og'
import { applyResolvedAccessTier } from '@/lib/post-access'
import { getPostBySlug } from '@/lib/sanity'
import { sanityFetch } from '@/sanity/lib/live'
import {
  PLACEHOLDER_IMAGE,
  postBySlugQuery,
} from '@/sanity/lib/queries'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'

export const alt = 'Blog post'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export default async function Image({ params }: Props) {
  const { slug } = await params

  let resolvedPost: ReturnType<typeof applyResolvedAccessTier> | null = null

  try {
    const { data: post } = await sanityFetch({
      query: postBySlugQuery,
      params: { slug, placeholderImage: PLACEHOLDER_IMAGE },
      stega: false,
    })
    resolvedPost = post ? applyResolvedAccessTier(post) : null
  } catch {
    resolvedPost = null
  }

  if (!resolvedPost) {
    const fallbackPost = await getPostBySlug(slug)
    resolvedPost = fallbackPost ? applyResolvedAccessTier(fallbackPost) : null
  }

  const title = resolvedPost?.title ?? 'Travel story'
  const excerpt = resolvedPost?.excerpt

  const imageUrl =
    urlForOpenGraphImage(resolvedPost?.coverImageOg) ?? PLACEHOLDER_IMAGE

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
              fontSize: 48,
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.2,
            }}
          >
            {title}
          </div>
          {excerpt && (
            <div
              style={{
                fontSize: 20,
                color: 'rgba(255,255,255,0.8)',
                marginTop: 16,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {excerpt}
            </div>
          )}
        </div>
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
      </div>
    ),
    { ...size }
  )
}
