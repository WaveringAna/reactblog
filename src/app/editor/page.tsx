"use client";

import React, { useRef, useState } from "react";
import TextareaAutoSize from "react-textarea-autosize"
import { Editor } from "~/components/DynamicEditor";
import Cover from "~/components/cover";
import type { BlockNoteEditor } from "@blocknote/core";
import { useRouter } from "next/navigation";
import type { NextResponse } from "next/server";

interface PostResponse extends NextResponse {
    success: boolean;
    data?: {
        title: string;
        content: string;
        excerpt: string;
        author: string;
        html: string;
        created_at: string;
        updated_at: string;
    }
    error?: string;
}

export default function PostCreatorPage() {
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const [coverUrl, setCoverUrl] = useState<string>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const editorRef = useRef<BlockNoteEditor>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
        if (!submitter || submitter.name !== 'submit-post') {
            return;
        }

        setIsSubmitting(true);
        setError("");
        try {
            if (!editorRef.current) throw new Error("Editor not ready");
            const document = editorRef.current.document;
            const html = await editorRef.current.blocksToFullHTML(document);
            console.log("Full HTML:", html);
            const response = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content: html, imageUrl: coverUrl }),
            });
            const data = await response.json() as PostResponse;
            if (!response.ok) {
                setError(data.error ?? "Something went wrong");
            } else {
                router.push("/posts");
                console.log("Success", data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        }
        setIsSubmitting(false);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Cover setUrl={setCoverUrl} url={coverUrl} />
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <TextareaAutoSize
                        className="w-full resize-none appearance-none overflow-hidden
                        bg-transparent text-5xl font-bold focus:outline;"
                        placeholder="Untitled"
                        onChange={(e) => setTitle(e.target.value)}
                        name="title"
                        id="title" />
                </div>
                <div className="min-h-[500px]" style={{ backgroundColor: "#fff" }}>
                    <Editor ref={editorRef} onChange={() => { /*DoNothing*/ }} />
                </div>
                <button
                    type="button"
                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                    onClick={() => {
                        if (editorRef.current) {
                            const document = editorRef.current.document;
                            const html = editorRef.current.blocksToFullHTML(document);
                            console.log("Full HTML:", html);
                        }
                    }}
                >
                    Log Full HTML
                </button>
                <button
                    type="submit"
                    name="submit-post"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Creating..." : "Create Post"}
                </button>
            </form>
        </div>
    );
}
