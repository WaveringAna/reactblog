import { writeFile } from 'fs/promises'
import path from 'path'

type UploadImageResponse = {
    success: boolean
    imagePath?: string
    error?: string
}

type ImageInput = {
    data: File | Buffer
    filename?: string
}

export async function uploadImage(
    input: ImageInput
): Promise<UploadImageResponse> {
    try {
        const { data, filename } = input

        // Handle File object
        if (data instanceof File) {
            if (!data.type.startsWith('image/')) {
                return {
                    success: false,
                    error: 'File must be an image'
                }
            }
        }

        // Create a safe filename
        const finalFilename = filename ??
            `${Date.now()}-${Math.random().toString(36).substring(2)}${data instanceof File ? path.extname(data.name) : '.jpg'
            }`

        // Define the upload directory and full path
        const uploadDir = path.join(process.cwd(), 'public', 'data')
        const filePath = path.join(uploadDir, finalFilename)

        // Convert to buffer if it's a File
        const buffer = data instanceof File
            ? Buffer.from(await data.arrayBuffer())
            : data

        // Write the file
        await writeFile(filePath, buffer)

        return {
            success: true,
            imagePath: `/data/${finalFilename}`
        }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to upload image'
        }
    }
}