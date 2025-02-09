import { db } from "~/server/db";
import { socialLinks as MockSocialLinks, books as MockBooks, blogPosts as BlogPosts, authors as MockAuthors } from "~/lib/data/mock-data";
import { authors, socialLinks, books, posts, images } from "~/server/db/schema";

import type { Author } from "~/types";
import { uploadImage } from "~/lib/services/image-upload";

export default async function SandboxPage() {
    return (
        <div className="flex flex-col gap-4">
            Seed Function
            <form
                action={async () => {
                    "use server";

                    console.log("running on server, seeding data");

                    const authorsInsert = await db.insert(authors).values(
                        MockAuthors.map((author: Author) => ({
                            id: 1,
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
                            content: book.content,
                            author: book.author,
                        }))
                    )

                    const postsInsert = await db.insert(posts).values(
                        BlogPosts.map((post, index) => ({
                            id: index + 1,
                            title: post.title,
                            author: post.author,
                            excerpt: post.excerpt,
                            content: post.content,
                            html: post.html,
                            created_at: post.date,
                            updated_at: post.date,
                        }))
                    )

                    const imagesInsert = await db.insert(images).values({
                        imagePath: "/data/placeholder.jpg",
                        createdAt: new Date().toDateString(),
                        updatedAt: new Date().toDateString(),
                    })

                    const ImageUploadResponse = await uploadImage({
                        data: Buffer.from('/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=', 'base64'),
                        filename: 'placeholder.jpg'
                    })

                    console.log("ImageUploadResponse", ImageUploadResponse);

                    console.log("inserted authors", authorsInsert);
                    console.log("inserted links", linksInsert);
                    console.log("inserted books", booksInsert);
                    console.log("inserted posts", postsInsert);
                    console.log("inserted images", imagesInsert);
                }}
            >
                <button type="submit">Seed Data</button>
            </form>
        </div>
    )
}