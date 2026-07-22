import { getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) return notFound();

  return (
    <div className="relative min-h-screen pt-32">
      <div className="mx-auto max-w-[840px] px-5 pb-20 sm:px-10">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 font-mono text-[13px] text-muted-faint transition-colors hover:text-accent"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        <div className="mb-8 flex flex-wrap items-center gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-[rgba(103,232,249,.12)] px-2.5 py-1 font-mono text-[11px] uppercase text-[#7bebff]"
            >
              {tag}
            </span>
          ))}
          <span className="font-mono text-[11px] text-muted-ghost">{post.date}</span>
        </div>

        <article className="prose prose-invert prose-zinc max-w-none lg:prose-lg prose-headings:tracking-tight prose-h1:text-gradient-ice prose-a:text-accent hover:prose-a:text-accent-hover prose-code:font-mono prose-code:text-accent">
          <MDXRemote source={post.content} />
        </article>
      </div>
    </div>
  );
}
