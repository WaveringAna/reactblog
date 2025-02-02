import type { Book, SocialLink, Author, BlogPost } from "~/types"
import { author, socialLinks, books, blogPosts } from "../data/mock-data"

export async function getAuthor(): Promise<Author> {
  // In the future, replace with API call
  return author
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  // In the future, replace with API call
  return socialLinks
}

export async function getBooks(): Promise<Book[]> {
  // In the future, replace with API call
  return books
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  // In the future, replace with API call
  return blogPosts
}
