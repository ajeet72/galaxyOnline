// src/app/blog/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { components } from '@/components/mdx-components';
import remarkGfm from 'remark-gfm';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};


export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const { meta } = post;

  return {
    title: meta.title,
    description: meta.summary,
    openGraph: {
      title: meta.title,
      description: meta.summary,
      images: [meta.coverImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.summary,
      images: [meta.coverImage],
    },
  };
}

// ✅ Actual Blog Page
export default function BlogPostPage(props: Props) {
  const { params } = props;
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const { meta, content } = post;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 ">
      {/* Cover Image */}
      {meta.coverImage && (
        <img
          src={meta.coverImage}
          alt={meta.title}
          className="w-full object-cover rounded mb-6"
        />
      )}

      {/* Title + Meta */}
      <h1 className="text-4xl font-bold mb-2">{meta.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        By {meta.author} • {new Date(meta.publishedAt).toLocaleDateString()}
      </p>

      {/* MDX content */}
      <article className="prose dark:prose-invert prose-lg max-w-none">
        <MDXRemote
          source={content}
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </article>
    </main>
  );
}
