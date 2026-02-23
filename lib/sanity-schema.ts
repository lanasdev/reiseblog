/**
 * Sanity Schema for Reiseblog
 *
 * To use this in your Sanity Studio, create a schema file with:
 *
 * export default {
 *   name: 'post',
 *   title: 'Blog Post',
 *   type: 'document',
 *   fields: [
 *     { name: 'title', title: 'Title', type: 'string' },
 *     { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
 *     { name: 'excerpt', title: 'Excerpt', type: 'text' },
 *     { name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } },
 *     { name: 'date', title: 'Date', type: 'date' },
 *     {
 *       name: 'location',
 *       title: 'Location',
 *       type: 'object',
 *       fields: [
 *         { name: 'name', title: 'Place Name', type: 'string' },
 *         { name: 'country', title: 'Country', type: 'string' },
 *         { name: 'lat', title: 'Latitude', type: 'number' },
 *         { name: 'lng', title: 'Longitude', type: 'number' },
 *       ],
 *     },
 *     { name: 'category', title: 'Category', type: 'string' },
 *     { name: 'readTime', title: 'Read Time (minutes)', type: 'number' },
 *     { name: 'body', title: 'Body', type: 'blockContent' },
 *   ],
 * }
 */

export {}
