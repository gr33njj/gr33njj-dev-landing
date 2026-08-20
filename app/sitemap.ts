import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE = "https://gr33njj.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const caseSlugs = ["skangar", "mydoctor", "trad3", "gazon"];

  return [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/classic`, changeFrequency: "monthly", priority: 0.4 },
    ...caseSlugs.map((slug) => ({
      url: `${BASE}/case/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
