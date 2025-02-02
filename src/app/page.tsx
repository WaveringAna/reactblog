import { Hero } from "~/components/hero"
import { BooksAndAuthorSection } from "~/components/books-author-section"
import { getAuthor, getBooks } from "~/lib/services/data-service"
import { BlogSection } from "~/components/blog-section"
import { blogPosts } from "~/lib/data/mock-data"

export default async function Home() {
  const author = await getAuthor()
  const books = await getBooks()

  return (
    <div className="min-h-screen">
      <Hero author={author} />
      <BooksAndAuthorSection books={books} author={author} />
      <BlogSection posts={blogPosts} />
    </div>
  )
}

