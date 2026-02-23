export interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  coverImage: string
  date: string
  location: {
    name: string
    country: string
    lat: number
    lng: number
  }
  category: string
  readTime: number
}
