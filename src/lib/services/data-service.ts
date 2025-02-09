import type { Book, SocialLink, Author, BlogPost, Image } from "~/types"
//import { authors, socialLinks, books, blogPosts } from "../data/mock-data"
import { authors, socialLinks, books, posts, images } from "~/server/db/schema"
import { db } from "~/server/db"

export async function getAuthor(): Promise<Author[]> {
  const data = await db.select().from(authors)
  return data.map(author => ({
    ...author,
    id: author.id.toString(),
    name: author.name ?? '',
    bio: author.bio ?? '',
    avatar: author.avatar ?? '',
    quote: author.quote ?? '',
    heroImage: author.heroImage ?? ''
  }))
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  const data = await db.select().from(socialLinks)
  return data.map(link => ({
    ...link,
    id: link.id.toString(),
    platform: link.platform ?? '',
    url: link.url ?? '',
    icon: link.icon ?? ''
  }))
}

export async function getBooks(): Promise<Book[]> {
  const data = await db.select().from(books)
  return data.map(book => ({
    ...book,
    id: book.id.toString(),
    title: book.title ?? '',
    imageUrl: book.imageUrl ?? '',
    link: book.link ?? '',
    description: book.description ?? '',
    publishDate: book.publishDate ?? '',
    content: book.content ?? '',
    author: book.author ?? ''
  }))
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const data = await db.select().from(posts)
  return data.map(post => ({
    id: post.id.toString(),
    title: post.title ?? '',
    excerpt: post.excerpt ?? '',
    content: post.content ?? '',
    date: post.created_at ?? '',
    imageUrl: '',
    slug: '',
    author: post.author ?? '',
    html: post.html ?? ''
  }))
}

export async function getImages(): Promise<Image[]> {
  const data = await db.select().from(images)
  return data.map(image => ({
    id: image.id.toString(),
    imagePath: image.imagePath ?? '',
    createdAt: image.createdAt ?? '',
    updatedAt: image.updatedAt ?? ''
  }))
}