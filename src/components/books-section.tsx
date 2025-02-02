import Image from "next/image"
import Link from "next/link"
import type { Book } from "~/types"

interface BooksSectionProps {
  books: Book[]
}

export function BooksSection({ books }: BooksSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-8">BOOKS</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {books.map((book) => (
            <Link key={book.id} href={book.link} className="group">
              <div className="relative aspect-[3/4] transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={book.imageUrl || "/placeholder.svg"}
                  alt={book.title}
                  fill
                  className="object-cover shadow-lg"
                />
              </div>
              <h3 className="text-center text-sm mt-2">{book.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

