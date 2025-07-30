export interface PostFrontmatter {
  title: string
  slug: string
  summary: string
  publishedAt: string
  coverImage?: string
  author?: string
}

export interface Post extends PostFrontmatter {
  content: string
  mdxSource: any
}