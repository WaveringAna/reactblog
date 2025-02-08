// app/api/images/route.ts
import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

interface PostRequest {
    image: string; // Base64 encoded image
    filename: string;
    contentType: string;
}

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const { image, filename, contentType } = (await request.json()) as PostRequest;

        if (!image || !filename || !contentType) {
            return NextResponse.json(
                { error: "Missing required request bodies" },
                { status: 400 }
            );
        }

        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");

        const uniqueFilename = `${Date.now()}-${filename}`;
        const uploadDir = path.join(process.cwd(), "public", "data", uniqueFilename);
        const filePath = path.join(uploadDir, uniqueFilename);

        const uploadedFilePath = `/data/${uniqueFilename}`

        await writeFile(filePath, buffer);

        const result = await db.insert(images).values({
            imagePath: uploadedFilePath,
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        });

        return NextResponse.json({
            success: true, data: {
                ...result,
                imageUrl: `/data/${uniqueFilename}`
            }
        }, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json(
            { error: "Failed to create post" },
            { status: 500 }
        );
    }
}

export function GET() {
    return NextResponse.json({ success: true, data: [] });
}