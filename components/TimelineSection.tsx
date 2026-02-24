import { TimelineItem } from '@/components/TimelineItem'
import type { MilestoneItem } from '@/lib/types'
import { studioUrl } from '@/sanity/lib/api'
import type { PathSegment } from 'sanity'
import { createDataAttribute, stegaClean } from 'next-sanity'
import { OptimisticSortOrder } from './OptimisticSortOrder'

interface TimelineSectionItem {
  _key: string
  title: string
  milestones: MilestoneItem[]
}

export function TimelineSection({
  timelines,
  id,
  type,
  path,
}: {
  timelines: TimelineSectionItem[]
  id: string | null
  type: string | null
  path: PathSegment[]
}) {
  const dataAttribute =
    id && type
      ? createDataAttribute({ baseUrl: studioUrl, id, type, path })
      : null

  return (
    <div
      className="flex flex-col gap-4 pt-16 md:flex-row"
      data-sanity={dataAttribute?.()}
    >
      <OptimisticSortOrder id={id} path={path}>
        {timelines?.map((timeline) => {
          const { title, milestones, _key } = timeline
          return (
            <div
              className="max-w-[80%] md:max-w-[50%]"
              key={_key}
              data-sanity={dataAttribute?.([{ _key }])}
            >
              <div className="pb-5 font-sans text-xl font-bold text-foreground">
                {stegaClean(title)}
              </div>
              <OptimisticSortOrder id={id} path={[...path, { _key }, 'milestones']}>
                {milestones?.map((experience) => (
                  <div
                    key={experience._key}
                    data-sanity={dataAttribute?.([
                      { _key },
                      'milestones',
                      { _key: experience._key },
                    ])}
                    className="group"
                  >
                    <TimelineItem milestone={stegaClean(experience)} />
                  </div>
                ))}
              </OptimisticSortOrder>
            </div>
          )
        })}
      </OptimisticSortOrder>
    </div>
  )
}
