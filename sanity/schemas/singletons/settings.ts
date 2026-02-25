import { CogIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'menuItems',
      title: 'Menu Items',
      description: 'Links displayed on the header of your site.',
      type: 'array',
      of: [
        defineArrayMember({
          title: 'Reference',
          type: 'reference',
          to: [
            { type: 'home' },
            { type: 'page' },
            { type: 'post' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'footer',
      description: 'Text displayed in the sidebar footer. Supports links.',
      title: 'Footer Text',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'url', title: 'Url' },
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      description: 'Links to social profiles (Instagram, Twitter, etc.).',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          fields: [
            {
              name: 'platform',
              type: 'string',
              title: 'Platform',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Twitter / X', value: 'twitter' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'GitHub', value: 'github' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              type: 'url',
              title: 'URL',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { platform: 'platform' },
            prepare: ({ platform }) => ({
              title: platform ? platform.charAt(0).toUpperCase() + platform.slice(1) : 'Social link',
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Displayed on social cards and search engine results.',
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
        subtitle: 'Menu Items, Footer, Social Links, and Open Graph Image',
      }
    },
  },
})
