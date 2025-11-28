"use client";

import { getAllPosts, Post } from "@/lib/blog";
import { useLanguage } from "@/lib/i18n";
import { Section, SectionTitle, Card, Badge } from "@/components/ui/Primitives";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BlogList() {
  const { t, lang } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // In a real app, this would be passed from server component or API
    // Here we're mocking for client component simplicity given the architecture
    fetch("/api/blog")
      .then(res => res.json())
      .then(data => setPosts(data.posts));
  }, []);

  const filteredPosts = posts.filter(p => p.lang === lang);

  return (
    <div className="pt-24 min-h-screen">
      <Section>
        <SectionTitle>{t("Engineering Notes", "Инженерные Заметки")}</SectionTitle>
        
        <div className="grid gap-6 mt-8">
          {filteredPosts.length === 0 ? (
            <div className="text-zinc-500 font-mono">{t("Loading posts...", "Загрузка постов...")}</div>
          ) : (
            filteredPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="group cursor-pointer hover:border-accent/50">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <span className="text-xs font-mono text-zinc-500">{post.date}</span>
                  </div>
                  <p className="text-zinc-400 mb-4">{post.excerpt}</p>
                  <div className="flex gap-2">
                    {post.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>
      </Section>
    </div>
  );
}


