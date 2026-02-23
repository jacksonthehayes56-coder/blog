import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { marked } from "marked";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: { params: { slug?: string } }) {
  const slug = params?.slug;

  if (!slug) {
    notFound();
  }

  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const html = marked.parse(post.content) as string;

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <article className="prose prose-zinc dark:prose-invert">
        <h1>{post.title}</h1>
        <p className="text-sm text-zinc-500">{new Date(post.date).toLocaleString()}</p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </main>
  );
}
