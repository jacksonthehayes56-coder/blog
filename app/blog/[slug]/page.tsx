import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <article className="prose prose-zinc dark:prose-invert">
        <h1>{post.title}</h1>
        <p className="text-sm text-zinc-500">{new Date(post.date).toLocaleString()}</p>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </main>
  );
}
