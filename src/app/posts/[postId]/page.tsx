import { getBlogPosts } from "~/lib/services/data-service"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

interface PostPageProps {
    params: {
        postId: string
    }
}

export default async function PostPage({ params }: PostPageProps) {
    const [posts, postId] = await Promise.all([getBlogPosts(), params.postId])
    const post = posts.find((p) => p.id === postId)
    console.log(post)

    if (!post) {
        notFound()
    }

    return (
        <article className="container mx-auto px-4 py-16 max-w-4xl">
            <Link
                href="/posts"
                className="inline-flex items-center text-primary hover:text-primary/80 
        transition-colors mb-8"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Posts
            </Link>

            <header className="mb-12">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <div className="flex items-center text-gray-600 mb-8">
                    <span className="mr-4">{post.author}</span>
                    <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>
                </div>
                <div className="relative h-[400px] mb-8">
                    <Image
                        src={post.imageUrl || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover rounded-lg"
                        priority
                    />
                </div>
            </header>

            <div className="prose prose-lg max-w-none">
                {/* For now, we'll just display the content directly. 
            Later you might want to add markdown processing */}
                <p className="text-gray-600 leading-relaxed">{post.content}</p>
            </div>
        </article>
    )
}

// Generate static params for all posts
export async function generateStaticParams() {
    const posts = await getBlogPosts()

    return posts.map((post) => ({
        postId: post.id,
    }))
}
