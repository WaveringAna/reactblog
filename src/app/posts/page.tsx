import { FC } from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

const PostsPage: FC = () => {
    // Get posts from the file system at build time
    const getPosts = () => {
        const postsDirectory = path.join(process.cwd(), 'src/app/posts');
        const fileNames = fs.readdirSync(postsDirectory);

        return fileNames
            .filter(fileName => fileName !== 'page.tsx') // Exclude the page.tsx file
            .map(fileName => {
                const postId = fileName.replace(/\.tsx$/, '');
                return {
                    id: postId,
                    title: postId.replace(/^\[|\]$/g, '').replace(/-/g, ' '), // Clean up the file name for display
                };
            });
    };

    const posts = getPosts();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
            <ul className="space-y-4">
                {posts.map(post => (
                    <li key={post.id} className="border p-4 rounded-lg hover:bg-gray-50">
                        <Link href="/posts/[slug]" as={`/posts/${post.id}`}>
                            <div className="text-xl text-blue-600 hover:underline">
                                {post.title}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostsPage;