import { GeopointInput } from "@/sanity/components/GeopointInput"
import { defineArrayMember, defineField, defineType } from "sanity"

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Place Name", type: "string" }),
        defineField({ name: "country", title: "Country", type: "string" }),
        defineField({
          name: "coordinates",
          title: "Coordinates",
          type: "geopoint",
          description: "Click on the map to set the location",
          components: { input: GeopointInput },
        }),
        defineField({
          name: "lat",
          title: "Latitude",
          type: "number",
          hidden: true,
          readOnly: true,
        }),
        defineField({
          name: "lng",
          title: "Longitude",
          type: "number",
          hidden: true,
          readOnly: true,
        }),
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "tag" }] })],
    }),
    defineField({
      name: "readTime",
      title: "Read Time (minutes)",
      type: "number",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
  ],
  preview: {
    select: { title: "title", media: "coverImage" },
  },
})
