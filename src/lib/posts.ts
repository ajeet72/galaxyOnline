import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import slugify from 'slugify';

const postsDir = path.join(process.cwd(), 'src', 'content', 'blog');

export type PostMeta = {
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
  coverImage: string;
  author: string;
};

export function getAllPostsMeta(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];

  const files = fs.readdirSync(postsDir);
  return files.map((file) => {
    const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
    const { data } = matter(content);
    return data as PostMeta;
  });
}


export function getPostBySlug(slug: string) {
  const filePath = path.join(postsDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, 'utf-8');
  const { data: meta, content } = matter(source);

  return { meta, content };
}


export function savePost(post: Partial<PostMeta> & { content: string }) {
  const safeSlug = slugify(post.slug || post.title || 'untitled', { lower: true, strict: true });
  const filePath = path.join(postsDir, `${safeSlug}.mdx`);
  const publishedAt = post.publishedAt || new Date().toISOString();

  const frontmatter = {
    title: post.title,
    slug: safeSlug,
    summary: post.summary,
    publishedAt,
    coverImage: post.coverImage,
    author: post.author,
  };

  const fileContent = `---\n${Object.entries(frontmatter)
    .map(([k, v]) => `${k}: "${v}"`)
    .join('\n')}\n---\n\n${post.content}`;

  fs.writeFileSync(filePath, fileContent);
  return safeSlug;
}

export function deletePost(slug: string) {
  const filePath = path.join(postsDir, `${slug}.mdx`);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}
