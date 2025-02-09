"use client";
import React, { forwardRef, useImperativeHandle } from "react";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import type { DefaultBlockSchema, PartialBlock } from "@blocknote/core";
import "@blocknote/shadcn/style.css";

interface EditorProps {
    onChange?: () => void;
    initialContent?: string;
}

const Editor = forwardRef((props: EditorProps, ref) => {
    const { initialContent, onChange } = props;
    interface ImageUploadResponse {
        success: boolean;
        data: {
            imageUrl: string;
        };
    }

    const imageUpload = async (image: File) => {
        console.log(image)
        const formData = new FormData();
        formData.append('file', image);

        const response = await fetch("/api/images", {
            method: "POST",
            body: formData
        });

        const data = await response.json() as ImageUploadResponse;
        if (!response.ok) {
            throw new Error(data.success ? "Failed to upload image" : "An error occurred");
        }
        console.log(data.data.imageUrl)
        return [data.data.imageUrl];
    }

    // Creates a new editor instance.
    const editor = useCreateBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock<DefaultBlockSchema>[] : undefined,
        uploadFile: async (file) => {
            const [res] = await imageUpload(file);
            console.log(res)
            return res ?? '';
        },
    });

    // Expose editor instance through the ref.
    useImperativeHandle(ref, () => editor);

    // Renders the editor instance using a React component.
    return (
        <BlockNoteView
            editor={editor}
            onChange={onChange}
            shadCNComponents={{
                // Pass modified ShadCN components from your project here.
                // Otherwise, the default ShadCN components will be used.
            }}
            theme="light"
            className="min-h-[500px]"
            style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
        </BlockNoteView>
    );
});

Editor.displayName = "Editor";

export default Editor;