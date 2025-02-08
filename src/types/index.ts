export interface MediaItem {
  id: string
  title: string
  source: string
  date: string
  imageUrl: string
  link: string
}

export interface Event {
  id: string
  date: string
  location: string
  title: string
  description: string
  imageUrl: string
  link: string
}

export interface Book {
  id: string
  title: string
  imageUrl: string
  link: string
  description: string
  publishDate: string
  content: string
  author: string
}

export interface Theme {
  id: string
  title: string
  imageUrl: string
  link: string
  description: string
}

export interface SocialLink {
  id: string
  platform: string
  url: string
  icon: string
}

export interface Author {
  id: string
  name: string
  bio: string
  avatar: string
  quote: string
  heroImage: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  imageUrl: string
  slug: string
  author: string
}

export interface Image {
  id: string
  imagePath: string
  createdAt: string
  updatedAt: string
}