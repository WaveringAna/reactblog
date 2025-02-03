import { getBlogPosts } from "~/lib/services/data-service"
import { Card, CardContent } from "~/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default async function PostsPage() {
    const posts = await getBlogPosts()

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-12 text-center">Blog Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <Link key={post.id} href={`/posts/${post.id}`}>
                        <Card className="h-full hover:shadow-lg transition-shadow">
                            <CardContent className="p-0">
                                <div className="relative h-48">
                                    <Image
                                        src={post.imageUrl || "/placeholder.svg"}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex justify-between items-center text-sm text-gray-500">
                                        <span>{post.author}</span>
                                        <time dateTime={post.date}>
                                            {new Date(post.date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </time>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}