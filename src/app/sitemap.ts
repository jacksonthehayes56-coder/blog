import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

// Uses NEXT_PUBLIC_SITE_URL env variable set in Vercel dashboard
// Fallback to vercel.app subdomain for local dev
const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nafismahim.website";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes];
}
