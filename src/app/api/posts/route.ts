// app/api/posts/route.ts
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";
import { NextResponse } from "next/server";

interface PostRequest {
    title: string;
    content: string;
}

export async function POST(request: Request) {
    try {
        const { title, content } = (await request.json()) as PostRequest;

        if (!title || !content) {
            return NextResponse.json(
                { error: "Title and content are required" },
                { status: 400 }
            );
        }

        const result = await db.insert(posts).values({
            title,
            content,
            excerpt: content.slice(0, 100),
            author: "Aaman Lamba",
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
