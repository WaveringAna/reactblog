import Image from "next/image";
import Link from "next/link";
import type { Author, Book } from "~/types";
import { Card, CardContent } from "./ui/card";

interface BooksAndAuthorSectionProps {
  books: Book[];
  author: Author;
}

export function BooksAndAuthorSection({ books, author }: BooksAndAuthorSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Books Column */}
          <div>
            <h2 className="text-2xl font-semibold mb-8 text-center lg:text-center">
              BOOKS
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {books.slice(0, 4).map((book) => (
                <Link
                  key={book.id}
                  href={book.link}
                  className="group flex flex-col items-center"
                >
                  <div className="relative w-2/4 aspect-[2/3] transition-transform 
                    duration-300 group-hover:scale-105">
                    <Image
                      src={book.imageUrl || "/placeholder.svg"}
                      alt={book.title}
                      fill
                      className="object-cover shadow-lg rounded-sm"
                      sizes="(max-width: 768px) 40vw, 25vw"
                    />
                  </div>
                  <h3 className="text-center text-sm mt-2 font-medium">
                    {book.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>

          {/* Author Column */}
          <div>
            <h2 className="text-2xl font-semibold mb-8 text-center">
              ABOUT ME
            </h2>
            <Card className="h-half">
              <CardContent className="p-6">
                <div className="relative">
                  {/* Author Image - Floated Right */}
                  <div className="hidden lg:block float-right ml-6 mb-6 w-2/3">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={author.avatar}
                        alt={author.name}
                        fill
                        className="object-cover"
                        sizes="66vw"
                      />
                    </div>
                  </div>

                  {/* Mobile Image */}
                  <div className="lg:hidden h-2/4 mb-4">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={author.avatar}
                        alt={author.name}
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                    </div>
                  </div>

                  {/* Text Content - Will wrap around the floated image */}
                  <div className="md:block lg:block">
                    <h3 className="text-xl font-semibold mb-4">{author.name}</h3>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {author.bio}
                      </p>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </p>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                    </div>
                    <Link
                      href="/about"
                      className="inline-block text-primary hover:text-primary/80 
                      transition-colors font-medium"
                    >
                      Read More »
                    </Link>
                  </div>

                  {/* Mobile Read More Link */}
                  <div className="lg:hidden text-center">
                    <Link
                      href="/about"
                      className="inline-block px-6 py-3 bg-white/90 text-primary 
                      hover:bg-white transition-colors font-medium rounded-sm"
                    >
                      Read More »
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
