import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'timeline',
  title: 'Timeline',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      description:
        "Allows for creating timelines (max 2) for displaying in the page body.",
      type: 'array',
      validation: (rule) => rule.max(2),
      of: [
        defineArrayMember({
          name: 'item',
          title: 'Item',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({
              name: 'milestones',
              title: 'Milestones',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'milestone',
                  title: 'Milestone',
                  type: 'milestone',
                }),
              ],
            }),
          ],
          preview: {
            select: { items: 'milestones', title: 'title' },
            prepare({ items, title }: { items?: { title: string }[]; title?: string }) {
              const hasItems = items && items.length > 0
              const itemCount = items?.length ?? 0
              const milestoneNames = hasItems ? items.map((t) => t.title).join(', ') : ''
              return {
                subtitle: hasItems
                  ? `${milestoneNames} (${itemCount} item${itemCount > 1 ? 's' : ''})`
                  : 'No milestones',
                title,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { items: 'items' },
    prepare({ items }: { items?: { title: string }[] }) {
      const hasItems = items && items.length > 0
      const itemCount = items?.length ?? 0
      const timelineNames = hasItems ? items.map((t) => t.title).join(', ') : ''
      return {
        title: 'Timelines',
        subtitle: hasItems
          ? `${timelineNames} (${itemCount} item${itemCount > 1 ? 's' : ''})`
          : 'No timelines',
      }
    },
  },
})
