import { db } from "~/server/db";
import { socialLinks as MockSocialLinks, books as MockBooks, blogPosts as BlogPosts, authors as MockAuthors } from "~/lib/data/mock-data";
import { authors, socialLinks, books, posts } from "~/server/db/schema";

import type { Author } from "~/types";

export default function SandboxPage() {
    return (
        <div className="flex flex-col gap-4">
            Seed Function
            <form
                action={async () => {
                    "use server";

                    console.log("running on server, seeding data");

                    const authorsInsert = await db.insert(authors).values(
                        MockAuthors.map((author: Author, index: number) => ({
                            id: index + 1,
                            name: author.name,
                            bio: author.bio,
                            avatar: author.avatar,
                            quote: author.quote,
                            heroImage: author.heroImage,
                        }))
                    )

                    const linksInsert = await db.insert(socialLinks).values(
                        MockSocialLinks.map((socialLink, index) => ({
                            id: index + 1,
                            platform: socialLink.platform,
                            url: socialLink.url,
                            icon: socialLink.icon,
                        }))
                    )

                    const booksInsert = await db.insert(books).values(
                        MockBooks.map((book, index) => ({
                            id: index + 1,
                            title: book.title,
                            imageUrl: book.imageUrl,
                            link: book.link,
                            description: book.description,
                            publishDate: book.publishDate,
                        }))
                    )

                    const postsInsert = await db.insert(posts).values(
                        BlogPosts.map((post, index) => ({
                            id: index + 1,
                            title: post.title,
                            authorId: 1,
                            excerpt: post.excerpt,
                            content: post.content,
                            created_at: post.date,
                            updated_at: post.date,
                        }))
                    )

                    console.log("inserted authors", authorsInsert);
                    console.log("inserted links", linksInsert);
                    console.log("inserted books", booksInsert);
                    console.log("inserted posts", postsInsert);
                }}
            >
                <button type="submit">Seed Data</button>
            </form>
        </div>
    )
}