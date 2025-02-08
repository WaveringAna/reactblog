// app/api/images/route.ts
import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

interface ImageData {
    image: string;
    filename?: string;
}

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const formData = await request.formData();
        let buffer: Buffer;
        let filename: string;

        // Check if it's a form data file upload
        const file = formData.get('file') as File;
        if (file) {
            const bytes = await file.arrayBuffer();
            buffer = Buffer.from(bytes);
            filename = file.name || `image-${Date.now()}`;
        } else {
            // Handle base64 image
            const data = await request.json() as ImageData;
            if (!data.image) {
                return NextResponse.json(
                    { error: "Missing required image data" },
                    { status: 400 }
                );
            }
            const base64Data = data.image.replace(/^data:image\/\w+;base64,/, "");
            buffer = Buffer.from(base64Data, "base64");
            filename = data.filename ?? `image-${Date.now()}`;
        }

        // Extract file extension from the base64 data if no filename is provided
        if (!filename.includes('.')) {
            const matches = /^89504e47|ffd8ffe0|47494638/.exec(buffer.toString('hex', 0, 4));
            const ext = matches ?
                matches[0] === '89504e47' ? '.png' :
                    matches[0] === 'ffd8ffe0' ? '.jpg' :
                        matches[0] === '47494638' ? '.gif' : '.bin'
                : '.bin';
            filename += ext;
        }

        const uniqueFilename = `${Date.now()}-${filename}`;
        const uploadDir = path.join(process.cwd(), "public", "data");
        const filePath = path.join(uploadDir, uniqueFilename);

        await writeFile(filePath, buffer);

        const uploadedFilePath = `/data/${uniqueFilename}`;

        const result = await db.insert(images).values({
            imagePath: uploadedFilePath,
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        });

        console.log(result)

        return NextResponse.json({
            success: true,
            data: {
                imageUrl: uploadedFilePath
            }
        }, { status: 201 });
    } catch (error) {
        console.error("Error uploading image:", error);
        return NextResponse.json(
            { error: "Failed to upload image" },
            { status: 500 }
        );
    }
}

export function GET() {
    return NextResponse.json({ success: true, data: [] });
}