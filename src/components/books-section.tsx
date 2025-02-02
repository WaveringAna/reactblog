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
        <h2 className="text-2xl font-semibold mb-12 text-center">BOOKS</h2>
        <div className="flex justify-center">
          {/* Dynamic grid layout that changes based on screen size */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1400px]">
            {books.map((book) => (
              <Link
                key={book.id}
                href={book.link}
                className="group flex flex-col items-center"
              >
                {/* Book container with consistent sizing */}
                <div className="relative w-full max-w-[280px] aspect-[2/3] transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={book.imageUrl || "/placeholder.svg"}
                    alt={book.title}
                    fill
                    className="object-cover shadow-lg rounded-sm"
                    sizes="(max-width: 768px) 80vw, (max-width: 1024px) 40vw, 25vw"
                  />
                </div>
                <h3 className="text-center text-lg mt-4 font-medium">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {new Date(book.publishDate).getFullYear()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
