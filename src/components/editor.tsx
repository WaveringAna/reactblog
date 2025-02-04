"use client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import type { DefaultBlockSchema, PartialBlock } from "@blocknote/core";
import "@blocknote/shadcn/style.css";

interface EditorProps {
    onChange?: (value: string) => void;
    initialContent?: string;
}

export default function Editor({ initialContent }: EditorProps) {
    // Creates a new editor instance.
    const editor = useCreateBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock<DefaultBlockSchema>[] : undefined,
    });

    // Renders the editor instance using a React component.
    return (
        <BlockNoteView
            editor={editor}
            shadCNComponents={
                {
                    // Pass modified ShadCN components from your project here.
                    // Otherwise, the default ShadCN components will be used.
                }
            }
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
}
