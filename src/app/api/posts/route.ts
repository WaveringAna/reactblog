// app/api/posts/route.ts
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";
import { NextResponse } from "next/server";

interface PostRequest {
    title: string;
    content: string;
    imageUrl: string;
}

export async function POST(request: Request) {
    try {
        const { title, content, imageUrl } = (await request.json()) as PostRequest;

        if (!title || !content || !imageUrl) {
            return NextResponse.json(
                { error: "Title and content and cover image are required" },
                { status: 400 }
            );
        }

        // Strip HTML tags to extract plain text
        const plainText = content.replace(/<[^>]*>/g, '');

        const result = await db.insert(posts).values({
            title,
            content: plainText, // store the plain text
            excerpt: plainText.slice(0, 100), // generate excerpt from text-only content
            author: "Aaman Lamba",
            html: content, // store the raw HTML
            imageUrl,
            created_at: new Date().toDateString(),
            updated_at: new Date().toDateString(),
        });

        return NextResponse.json({ success: true, data: result }, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json(
            { error: "Failed to create post" },
            { status: 500 }
        );
    }
}
