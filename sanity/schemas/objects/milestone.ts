import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'milestone',
  title: 'Milestone',
  type: 'object',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({ type: 'string', name: 'description', title: 'Description' }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: "Milestone's cover image.",
      options: { hotspot: true },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Tags to categorize the milestone.',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      type: 'duration',
      name: 'duration',
      title: 'Duration',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { duration: 'duration', image: 'image', title: 'title' },
    prepare({ duration, image, title }: { duration?: { start?: string; end?: string }; image?: unknown; title?: string }) {
      return {
        media: image,
        subtitle: [
          duration?.start && new Date(duration.start).getFullYear(),
          duration?.end && new Date(duration.end).getFullYear(),
        ]
          .filter(Boolean)
          .join(' - '),
        title,
      }
    },
  },
})
