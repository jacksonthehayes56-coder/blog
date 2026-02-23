import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  const [latest, ...rest] = posts;

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-12 border-b border-zinc-200 pb-8">
        <p className="text-sm font-medium tracking-wide text-emerald-700 uppercase">
          Volta NYC · Nonprofit Digital Equity
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Practical playbooks for nonprofit digital marketing and web development.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          This blog is written for small nonprofits, student teams, and NYC neighborhood
          businesses who want modern, accessible digital presences without agency budgets.
          Built by the team behind {" "}
          <a
            href="https://voltanyc.org"
            className="font-medium text-emerald-700 underline dark:text-emerald-400"
          >
            Volta NYC
          </a>
          , a 501(c)(3) connecting student teams with local small businesses.
        </p>
      </header>

      {latest && (
        <section className="mb-12 grid gap-8 md:grid-cols-2">
          <article className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40">
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
              Latest Post · {new Date(latest.date).toLocaleString()}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              <Link href={`/blog/${latest.slug}`} className="hover:underline">
                {latest.title}
              </Link>
            </h2>
            <p className="mt-3 text-zinc-700 dark:text-zinc-300">{latest.description}</p>
            <div className="mt-4">
              <Link
                href={`/blog/${latest.slug}`}
                className="inline-flex items-center text-sm font-medium text-emerald-700 hover:text-emerald-800 dark:text-emerald-400"
              >
                Read the full article
                <span className="ml-1" aria-hidden>
                  →
                </span>
              </Link>
            </div>
          </article>

          <div className="space-y-4 self-center text-sm text-zinc-600 dark:text-zinc-400">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              What you&apos;ll find here
            </h3>
            <ul className="list-disc space-y-2 pl-5">
              <li>Step-by-step guides to nonprofit websites, SEO, and accessibility.</li>
              <li>Playbooks for using student teams on real client projects.</li>
              <li>Ideas for social content, newsletters, and analytics you can sustain.</li>
              <li>Stories and tactics grounded in NYC small business realities.</li>
            </ul>
          </div>
        </section>
      )}

      <section aria-label="All posts" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            All articles
          </h2>
          <p className="text-xs text-zinc-500">{posts.length} posts and counting.</p>
        </div>

        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {posts.map((post) => (
            <article key={post.slug} className="py-4">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                {new Date(post.date).toLocaleString()}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {post.description}
              </p>
            </article>
          ))}

          {posts.length === 0 && (
            <p className="py-4 text-sm text-zinc-500">No posts yet. Check back soon.</p>
          )}
        </div>
      </section>
    </main>
  );
}
