import type { BlogPost } from "./types"

export const demoPosts: BlogPost[] = [
  {
    _id: "1",
    title: "Die verborgenen Gassen von Marrakech",
    slug: "marrakech-hidden-alleys",
    excerpt:
      "Wandering through the labyrinthine medina, where every turn reveals a new world of color, scent, and sound.",
    coverImage:
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&h=400&fit=crop",
    date: "2025-11-15",
    location: {
      name: "Marrakech",
      country: "Morocco",
      lat: 31.6295,
      lng: -7.9811,
    },
    tags: [{ _id: "culture", name: "Culture", slug: "culture" }],
    readTime: 7,
  },
  {
    _id: "2",
    title: "Nordlichter in Tromso",
    slug: "northern-lights-tromso",
    excerpt:
      "Chasing the aurora borealis through the Arctic night, a dance of emerald light across the polar sky.",
    coverImage:
      "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=600&h=400&fit=crop",
    date: "2025-10-02",
    location: {
      name: "Tromso",
      country: "Norway",
      lat: 69.6492,
      lng: 18.9553,
    },
    tags: [{ _id: "nature", name: "Nature", slug: "nature" }],
    readTime: 5,
  },
  {
    _id: "3",
    title: "Streetfood-Tour durch Bangkok",
    slug: "bangkok-street-food",
    excerpt:
      "From smoky wok stations to sweet mango sticky rice, Bangkok's streets are a never-ending feast for the senses.",
    coverImage:
      "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=600&h=400&fit=crop",
    date: "2025-09-20",
    location: {
      name: "Bangkok",
      country: "Thailand",
      lat: 13.7563,
      lng: 100.5018,
    },
    tags: [{ _id: "food", name: "Food", slug: "food" }],
    readTime: 6,
  },
  {
    _id: "4",
    title: "Wanderung durch die Dolomiten",
    slug: "dolomites-hiking",
    excerpt:
      "Scaling the pale limestone towers of the Italian Alps, where every ridge opens onto a view that steals your breath.",
    coverImage:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop",
    date: "2025-08-05",
    location: {
      name: "Dolomites",
      country: "Italy",
      lat: 46.4102,
      lng: 11.8441,
    },
    tags: [{ _id: "adventure", name: "Adventure", slug: "adventure" }],
    readTime: 8,
  },
  {
    _id: "5",
    title: "Kyotos Herbstfarben",
    slug: "kyoto-autumn",
    excerpt:
      "Ancient temples framed by crimson maples, the serene beauty of Japan in its most painterly season.",
    coverImage:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop",
    date: "2025-07-12",
    location: {
      name: "Kyoto",
      country: "Japan",
      lat: 35.0116,
      lng: 135.7681,
    },
    tags: [{ _id: "culture", name: "Culture", slug: "culture" }],
    readTime: 6,
  },
  {
    _id: "6",
    title: "Sonnenuntergang auf Santorin",
    slug: "santorini-sunset",
    excerpt:
      "Watching the sun melt into the Aegean from the clifftop village of Oia, painting the white walls in liquid gold.",
    coverImage:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop",
    date: "2025-06-28",
    location: {
      name: "Santorini",
      country: "Greece",
      lat: 36.3932,
      lng: 25.4615,
    },
    tags: [{ _id: "relaxation", name: "Relaxation", slug: "relaxation" }],
    readTime: 4,
  },
  {
    _id: "7",
    title: "Patagoniens wilde Schoenheit",
    slug: "patagonia-wilderness",
    excerpt:
      "At the edge of the world, where glaciers calve into turquoise lakes and the wind shapes everything it touches.",
    coverImage:
      "https://images.unsplash.com/photo-1531761535209-180857e963b9?w=600&h=400&fit=crop",
    date: "2025-05-10",
    location: {
      name: "Patagonia",
      country: "Argentina",
      lat: -50.3402,
      lng: -72.2647,
    },
    tags: [{ _id: "adventure", name: "Adventure", slug: "adventure" }],
    readTime: 9,
  },
  {
    _id: "8",
    title: "Ein Tag in Lissabon",
    slug: "lisbon-day-trip",
    excerpt:
      "Riding the iconic Tram 28 through sun-drenched hills, past azulejo-tiled facades and the smell of pasteis de nata.",
    coverImage:
      "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=600&h=400&fit=crop",
    date: "2025-04-18",
    location: {
      name: "Lisbon",
      country: "Portugal",
      lat: 38.7223,
      lng: -9.1393,
    },
    tags: [{ _id: "city", name: "City", slug: "city" }],
    readTime: 5,
  },
]
