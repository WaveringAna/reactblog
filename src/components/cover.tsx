import React from "react";
import Image from "next/image";
import { type NextResponse } from "next/server";

interface CoverProps {
    url?: string;
    setUrl: (_: string) => void;
}

interface ImageResponse extends NextResponse {
    success: boolean;
    data?: {
        imageUrl: string;
    },
    error?: string;
}

const ImageUpload = async (image: File) => {
    const formData = new FormData();
    formData.append('file', image);

    const response = await fetch("/api/images", {
        method: "POST",
        body: formData
    });

    const data = await response.json() as ImageResponse;
    if (!response.ok || !data.data) {
        throw new Error(data.error ?? "Failed to upload image");
    }
    return data.data.imageUrl;
}

interface UploadButtonProps {
    onClientUploadComplete?: (imageUrl: string) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onClientUploadComplete }) => {
    const handleClick = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                try {
                    const imageUrl = await ImageUpload(file);
                    if (onClientUploadComplete) onClientUploadComplete(imageUrl);
                } catch (error) {
                    console.error('Failed to upload image:', error);
                }
            }
        };
        input.click();
    };

    return (
        <button className="hover:bg-neutral-100 text-neutral-400 rounded-md px-3 hover:text-neutral-500 transition-colors"
            onClick={handleClick}>
            Choose File
        </button>
    );
}

const Cover: React.FC<CoverProps> = ({ url, setUrl }) => {
    return (
        <div className="relative w-full h-[35vh] bg-neutral-300">
            <>
                <Image
                    src={url ?? '/placeholder.svg'}
                    alt="Cover"
                    fill
                    className="object-cover"
                    sizes="100vw"
                />
                <div className="absolute w-[20%] h-[20%] right-0 bottom-0 group flex justify-center items-center">
                    <UploadButton
                        onClientUploadComplete={(imageUrl) => {
                            console.log("Uploaded image URL:", imageUrl);
                            setUrl(imageUrl);
                        }}
                    />
                </div>
            </>
        </div>
    )
}

export default Cover;