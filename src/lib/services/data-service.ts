import type { MediaItem, Event, Book, Theme, SocialLink, Author, BlogPost } from "~/types"
import { author, socialLinks, events, books, themes, blogPosts } from "../data/mock-data"

export async function getAuthor(): Promise<Author> {
  // In the future, replace with API call
  return author
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  // In the future, replace with API call
  return socialLinks
}

export async function getEvents(): Promise<Event[]> {
  // In the future, replace with API call
  return events
}

export async function getBooks(): Promise<Book[]> {
  // In the future, replace with API call
  return books
}

export async function getThemes(): Promise<Theme[]> {
  // In the future, replace with API call
  return themes
}


export async function getBlogPosts(): Promise<BlogPost[]> {
  // In the future, replace with API call
  return blogPosts
}
