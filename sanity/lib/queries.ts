import { defineQuery } from 'next-sanity'

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop'

export const homePageQuery = defineQuery(`
  *[_type == "home"][0]{
    _id,
    _type,
    overview,
    title,
  }
`)

export const pagesBySlugQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    _type,
    body,
    overview,
    title,
    "slug": slug.current,
  }
`)

export const settingsQuery = defineQuery(`
  *[_type == "settings"][0]{
    _id,
    _type,
    footer,
    menuItems[]{
      _key,
      ...@->{
        _type,
        "slug": slug.current,
        title
      }
    },
    ogImage,
  }
`)

export const postsQuery = defineQuery(`
  *[_type == "post"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "coverImage": coalesce(coverImage.asset->url, $placeholderImage),
    date,
    location,
    "tags": tags[]->{ _id, name, "slug": slug.current },
    readTime
  }
`)

export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "coverImage": coalesce(coverImage.asset->url, $placeholderImage),
    date,
    location,
    "tags": tags[]->{ _id, name, "slug": slug.current },
    readTime,
    body
  }
`)

export const slugsByTypeQuery = defineQuery(`
  *[_type == $type && defined(slug.current)]{"slug": slug.current}
`)

export { PLACEHOLDER_IMAGE }
