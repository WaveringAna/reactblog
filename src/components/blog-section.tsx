import { Card, CardContent } from "~/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import type { BlogPost } from "~/types"

interface BlogSectionProps {
    posts: BlogPost[]
}

export function BlogSection({ posts }: BlogSectionProps) {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-semibold mb-8">BLOG</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`}>
                            <Card className="h-full">
                                <CardContent className="p-0">
                                    <div className="relative h-48">
                                        <Image src={post.imageUrl || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                                        <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
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
                <div className="text-right mt-4">
                    <Link href="/blog" className="text-sm font-medium">
                        All Posts »
                    </Link>
                </div>
            </div>
        </section>
    )
}

