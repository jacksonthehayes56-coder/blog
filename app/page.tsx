import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">Volta NYC Blog</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Insights on nonprofit digital marketing, web development, and digital equity from
          the team behind {""}
          <a
            href="https://voltanyc.org"
            className="font-medium text-zinc-900 underline dark:text-zinc-100"
          >
            Volta NYC
          </a>
          .
        </p>
      </header>

      <section className="space-y-6">
        {posts.map((post) => (
          <article key={post.slug} className="border-b border-zinc-200 pb-4 last:border-0">
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              {new Date(post.date).toLocaleString()}
            </p>
            <h2 className="mt-1 text-xl font-semibold">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">{post.description}</p>
          </article>
        ))}

        {posts.length === 0 && (
          <p className="text-zinc-500">No posts yet. Check back soon.</p>
        )}
      </section>
    </main>
  );
}
