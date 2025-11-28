import { getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Primitives";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) return notFound();

  return (
    <div className="pt-32 min-h-screen">
      <Section>
        <Link href="/blog" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Link>
        
        <article className="prose prose-invert prose-zinc max-w-none lg:prose-xl prose-headings:font-mono prose-headings:text-accent prose-a:text-accent hover:prose-a:text-white transition-colors">
          <MDXRemote source={post.content} />
        </article>
      </Section>
    </div>
  );
}


