import { posts as allPosts, Post as DataPost } from "./posts-data";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

export type Post = DataPost;

export function getAllPosts(): PostMeta[] {
  return [...allPosts]
    .map(({ content, ...meta }) => meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post {
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) {
    throw new Error(`Post not found for slug: ${slug}`);
  }
  return post;
}
