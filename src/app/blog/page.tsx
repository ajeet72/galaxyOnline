import { getAllPostsMeta } from '@/lib/posts';
import Link from 'next/link';

export default function BlogPage() {
  const posts = getAllPostsMeta();

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Blog</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="text-2xl text-blue-600 hover:underline">
              {post.title}
            </Link>
            <p className="text-gray-500 text-sm">{new Date(post.publishedAt).toDateString()}</p>
            <p className="mt-1">{post.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
