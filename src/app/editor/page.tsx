"use client";

import React, { useRef, useState } from "react";
import { Editor } from "~/components/DynamicEditor";
import type { BlockNoteEditor } from "@blocknote/core";
import { useRouter } from "next/navigation";

interface PostResponse {
    success: boolean;
    data?: string;
    error?: string;
}

export default function PostCreatorPage() {
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const editorRef = useRef<BlockNoteEditor>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                body: JSON.stringify({ title, content: html }),
            });
            const data = await response.json() as PostResponse;
            if (!response.ok) {
                setError(data.error ?? "Something went wrong");
            } else {
                router.push("/blog");
                console.log("Success", data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        }
        setIsSubmitting(false);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Post title"
                        className="w-full p-2 border rounded-lg"
                        disabled={isSubmitting}
                        name="title"
                        id="title"
                    />
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
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Creating..." : "Create Post"}
                </button>
            </form>
        </div>
    );
}
