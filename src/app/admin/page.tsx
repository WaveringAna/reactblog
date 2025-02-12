/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use server";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import type { Book } from "~/types";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";
import { authors, books } from "~/server/db/schema";
import { redirect } from "next/navigation";
import path from "path";
import fs from "fs/promises";

async function saveImageToPublic(file: File): Promise<string> {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${uuidv4()}-${file.name}`; // Generate unique filename
    const filePath = path.join(process.cwd(), "public", "data", filename); // Construct file path

    try {
        await fs.writeFile(filePath, buffer); // Write file to disk
        return `/data/${filename}`; // Return public URL
    } catch (error) {
        console.error("Error saving image:", error);
        throw new Error("Failed to save image to public directory");
    }
}

// ─── MOVE SERVER ACTIONS TO TOP-LEVEL ─────────────────────────────────────────

export async function submitBookData(formData: FormData) {
    "use server";
    const bookTitle = formData.get("bookTitle") as string;
    const bookLink = formData.get("bookLink") as string;
    const bookDescription = formData.get("bookDescription") as string;
    const bookPublishDate = formData.get("bookPublishDate") as string;
    const bookContent = formData.get("bookContent") as string;
    const bookAuthor = formData.get("bookAuthor") as string;
    const bookImageFile = formData.get("bookImage") as File;

    let bookImageUrl = "";

    if (bookImageFile) {
        try {
            bookImageUrl = await saveImageToPublic(bookImageFile);
        } catch (error) {
            console.error("Error saving book image:", error);
            return;
        }
    }

    const newBook: Book = {
        id: uuidv4(),
        title: bookTitle,
        imageUrl: bookImageUrl,
        link: bookLink,
        description: bookDescription,
        publishDate: bookPublishDate,
        content: bookContent,
        author: bookAuthor,
    };

    try {
        await db.insert(books).values({
            title: newBook.title,
            imageUrl: newBook.imageUrl,
            link: newBook.link,
            description: newBook.description,
            publishDate: newBook.publishDate,
            content: newBook.content,
            author: newBook.author,
        });

        revalidatePath("/");
        redirect("/");
    } catch (error) {
        console.error("Error inserting book data:", error);
    }
}

export async function submitAuthorData(formData: FormData) {
    "use server";

    // Get form values. (These will be strings or potentially empty strings.)
    const authorName = formData.get("authorName") as string;
    const authorBio = formData.get("authorBio") as string;
    const authorQuote = formData.get("authorQuote") as string;
    const authorAvatarFile = formData.get("authorAvatar") as File;
    const authorHeroImageFile = formData.get("authorHeroImage") as File;

    let authorAvatar: string | undefined;
    let authorHeroImage: string | undefined;

    // Only attempt file upload if a file is selected (and size > 0)
    if (authorAvatarFile && authorAvatarFile.size > 0) {
        try {
            authorAvatar = await saveImageToPublic(authorAvatarFile);
        } catch (error) {
            console.error("Error saving avatar image:", error);
            return;
        }
    }

    if (authorHeroImageFile && authorHeroImageFile.size > 0) {
        try {
            authorHeroImage = await saveImageToPublic(authorHeroImageFile);
        } catch (error) {
            console.error("Error saving hero image:", error);
            return;
        }
    }

    // Build an update object dynamically. Only include a field if it has a nonempty value.
    // (Adjust your condition as needed. This example treats an empty string as "no update.")
    const updateData: Partial<{
        name: string;
        bio: string;
        avatar: string;
        quote: string;
        heroImage: string;
    }> = {};

    if (authorName && authorName.trim() !== "") {
        updateData.name = authorName;
    }
    if (authorBio && authorBio.trim() !== "") {
        updateData.bio = authorBio;
    }
    if (authorQuote && authorQuote.trim() !== "") {
        updateData.quote = authorQuote;
    }
    if (authorAvatar !== undefined) {
        updateData.avatar = authorAvatar;
    }
    if (authorHeroImage !== undefined) {
        updateData.heroImage = authorHeroImage;
    }

    // If nothing is provided, you can early return (or decide on a default behavior)
    if (Object.keys(updateData).length === 0) {
        console.error("No fields provided to update.");
        return;
    }

    try {
        // Use Drizzle's upsert: if an author with id "1" exists, update only the fields in updateData.
        // Otherwise, insert a new record with the provided fields.
        await db
            .insert(authors)
            .values({
                id: 1,
                ...updateData,
            })
            .onConflictDoUpdate({
                set: updateData,
                target: [authors.id],
            });

        revalidatePath("/");
        redirect("/");
    } catch (error) {
        console.error("Error upserting author data:", error);
    }
}

// ─── NOW THE ADMIN PAGE CAN USE THE SERVER ACTIONS ─────────────────────────────

export default async function AdminPage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Admin Page</h1>

            {/* Book Form */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Add New Book</CardTitle>
                    <CardDescription>
                        Enter the details for a new book to add to your collection.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <form action={submitBookData}>
                        <div className="grid gap-2">
                            <Label htmlFor="bookTitle">Title</Label>
                            <Input id="bookTitle" name="bookTitle" type="text" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="bookImage">Image</Label>
                            <Input id="bookImage" name="bookImage" type="file" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="bookLink">Link</Label>
                            <Input id="bookLink" name="bookLink" type="text" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="bookDescription">Description</Label>
                            <Textarea id="bookDescription" name="bookDescription" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="bookPublishDate">Publish Date</Label>
                            <Input id="bookPublishDate" name="bookPublishDate" type="text" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="bookContent">Content</Label>
                            <Textarea id="bookContent" name="bookContent" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="bookAuthor">Author</Label>
                            <Input id="bookAuthor" name="bookAuthor" type="text" />
                        </div>
                        <Button type="submit">Submit Book</Button>
                    </form>
                </CardContent>
            </Card>

            {/* About Me Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Edit About Me</CardTitle>
                    <CardDescription>
                        Update your personal information and biography.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <form action={submitAuthorData}>
                        <div className="grid gap-2">
                            <Label htmlFor="authorName">Name</Label>
                            <Input id="authorName" name="authorName" type="text" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="authorBio">Bio</Label>
                            <Textarea id="authorBio" name="authorBio" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="authorAvatar">Avatar Image</Label>
                            <Input id="authorAvatar" name="authorAvatar" type="file" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="authorQuote">Quote</Label>
                            <Input id="authorQuote" name="authorQuote" type="text" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="authorHeroImage">Hero Image</Label>
                            <Input
                                id="authorHeroImage"
                                name="authorHeroImage"
                                type="file"
                            />
                        </div>
                        <Button type="submit">Submit About Me</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
