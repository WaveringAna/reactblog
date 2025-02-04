"use client";

import { Editor } from "~/components/DynamicEditor";
import { useState } from "react";

export default function PostCreatorPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleChange = (newContent: string) => {
        setContent(newContent);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement post creation logic
        console.log({ title, content });
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Post title"
                        className="w-full p-2 border rounded-lg"
                    />
                </div>
                <div className="min-h-[500px]" style={{ backgroundColor: "#fff" }}>
                    <Editor onChange={handleChange} />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Create Post
                </button>
            </form>
        </div >
    );
}