import { Hero } from "~/components/hero"
import { MediaSection } from "~/components/media-section"
import { EventsSection } from "~/components/events-section"
import { BooksSection } from "~/components/books-section"
import { ThemesSection } from "~/components/themes-section"
import { getAuthor, getEvents, getBooks, getThemes } from "~/lib/services/data-service"
import { BlogSection } from "~/components/blog-section"
import { blogPosts } from "~/lib/data/mock-data"

export default async function Home() {
  const author = await getAuthor()
  const events = await getEvents()
  const books = await getBooks()
  const themes = await getThemes()

  return (
    <div className="min-h-screen">
      <Hero author={author} />
      <BlogSection posts={blogPosts} />
      <BooksSection books={books} />
      <EventsSection events={events} />
    </div>
  )
}

