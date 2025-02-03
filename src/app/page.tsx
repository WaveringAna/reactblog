import { Hero } from "~/components/hero"
import { BooksAndAuthorSection } from "~/components/books-author-section"
import { getAuthor, getBooks, getBlogPosts } from "~/lib/services/data-service"
import { BlogSection } from "~/components/blog-section"
//import { blogPosts } from "~/lib/data/mock-data"

export default async function Home() {
  const authors = await getAuthor()
  let author = authors[0]

  if (!author) {
    author = {
      id: '0',
      name: '',
      bio: '',
      avatar: '',
      quote: '',
      heroImage: '',
    }
  }

  const books = await getBooks()
  const blogPosts = await getBlogPosts()

  return (
    <div className="min-h-screen">
      <Hero author={author} />
      <BooksAndAuthorSection books={books} author={author} />
      <BlogSection posts={blogPosts} />
    </div>
  )
}

