import ImageBox from '@/components/ImageBox'
import type { MilestoneItem } from '@/lib/types'

export function TimelineItem({ milestone }: { milestone: MilestoneItem }) {
  const { description, duration, image, tags, title } = milestone
  const startYear = duration?.start ? new Date(duration.start).getFullYear() : undefined
  const endYear = duration?.end ? new Date(duration.end).getFullYear() : 'Now'

  return (
    <div className="flex min-h-[200px] font-sans last:pb-2">
      <div className="flex flex-col">
        <div
          className="relative overflow-hidden rounded-md bg-muted"
          style={{ width: 65, height: 65 }}
        >
          <ImageBox
            image={image}
            alt={title || 'Timeline item icon'}
            size="10vw"
            width={65}
            height={65}
          />
        </div>
        <div className="mt-2 w-px grow self-center bg-border group-last:hidden" />
      </div>
      <div className="flex-initial pl-4">
        <div className="font-bold text-foreground">{title}</div>
        <div className="text-sm text-muted-foreground">
          {tags?.map((tag) => (
            <span key={tag}>
              {tag}
              <span className="mx-1">●</span>
            </span>
          ))}
          {startYear} - {endYear}
        </div>
        <div className="pb-5 pt-3 font-serif text-muted-foreground">{description}</div>
      </div>
    </div>
  )
}
