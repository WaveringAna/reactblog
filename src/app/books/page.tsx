import { getBooks } from "~/lib/services/data-service"
import { Card, CardContent } from "~/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default async function BooksPage() {
    const books = await getBooks()

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-12 text-center">My Books</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {books.map((book) => (
                    <Link href={`/books/${book.id}`} key={book.id} className="block">
                        <Card className="h-full hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="aspect-[2/3] relative mb-4">
                                    <Image
                                        src={book.imageUrl || "/placeholder.svg"}
                                        alt={book.title}
                                        fill
                                        className="object-cover rounded-md"
                                    />
                                </div>
                                <h2 className="text-xl font-semibold">{book.title}</h2>
                                <p className="text-gray-600 mt-2">{book.author}</p>
                                <p className="text-gray-500 mt-2 text-sm line-clamp-3">
                                    {book.content}
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}