import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { homePageQuery } from '@/sanity/lib/queries'
import { draftMode } from 'next/headers'
import { toPlainText } from 'next-sanity'
import { VisualEditing } from 'next-sanity/visual-editing'
import { Suspense } from 'react'
import { Toaster } from 'sonner'
import { handleError } from './client-functions'
import { DraftModeToast } from './DraftModeToast'

export async function generateMetadata() {
  try {
    const { data: homePage } = await sanityFetch({
      query: homePageQuery,
      stega: false,
    })

    return {
      title: homePage?.title
        ? {
            template: `%s | ${homePage.title}`,
            default: homePage.title || 'Reiseblog',
          }
        : undefined,
      description: homePage?.overview
        ? toPlainText(homePage.overview)
        : 'A travel blog mapping adventures and stories from destinations around the globe.',
    }
  } catch {
    return {
      title: 'Reiseblog - Travel Stories From Around the World',
      description:
        'A travel blog mapping adventures and stories from destinations around the globe.',
    }
  }
}

export default async function ContentLayout({
  children,
}: { children: React.ReactNode }) {
  const draft = await draftMode()

  return (
    <>
      {children}
      <Toaster />
      <SanityLive onError={handleError} />
      {draft.isEnabled && (
        <>
          <Suspense fallback={null}>
            <DraftModeToast
              action={async () => {
                'use server'
                const dm = await draftMode()
                await Promise.allSettled([
                  dm.disable(),
                  new Promise((resolve) => setTimeout(resolve, 1000)),
                ])
              }}
            />
          </Suspense>
          <VisualEditing />
        </>
      )}
    </>
  )
}
