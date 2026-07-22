"use client";

import { Post } from "@/lib/blog";
import { useLanguage } from "@/lib/i18n";
import Reveal from "@/components/ui/Reveal";
import Link from "next/link";
import { useEffect, useState } from "react";

const colors = ["#67e8f9", "#a855f7", "#38bdf8", "#34f5c5"];

function rgba(hex: string, a: number) {
  const n = hex.replace("#", "");
  const r = parseInt(n.substring(0, 2), 16);
  const g = parseInt(n.substring(2, 4), 16);
  const b = parseInt(n.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function DiamondCover({ color, height }: { color: string; height: number }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        minHeight: height,
        background: `linear-gradient(135deg, ${rgba(color, 0.18)}, rgba(154,19,232,.22))`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 rotate-45 border border-[rgba(180,235,255,.4)]"
        style={{
          width: height * 0.45,
          height: height * 0.45,
          margin: `-${height * 0.225}px 0 0 -${height * 0.225}px`,
          background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,.3), transparent 50%), linear-gradient(135deg, ${rgba(color, 0.2)}, rgba(168,85,247,.2))`,
          boxShadow: `inset 0 0 40px ${rgba(color, 0.3)}`,
        }}
      />
    </div>
  );
}

export default function BlogList() {
  const { t, lang } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const filteredPosts = posts.filter((p) => p.lang === lang);
  const [featured, ...rest] = filteredPosts;

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <header className="relative mx-auto max-w-[1080px] px-5 pb-14 pt-[150px] sm:px-10 lg:px-16">
        <div className="absolute right-[clamp(20px,5vw,80px)] top-[120px] hidden h-10 w-10 animate-shard border border-[rgba(180,235,255,.4)] bg-[linear-gradient(135deg,rgba(103,232,249,.4),rgba(168,85,247,.35))] md:block" />
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 font-mono text-[13px] text-muted-faint transition-colors hover:text-accent"
        >
          ← {t("Back home", "На главную")}
        </Link>
        <div className="mb-4 font-mono text-xs uppercase tracking-[.16em] text-accent">
          {t("Notes from the workbench", "Заметки из мастерской")}
        </div>
        <h1 className="mb-5 text-[clamp(40px,7vw,84px)] font-bold leading-[0.98] tracking-[-.03em]">
          <span className="animate-shimmer text-gradient-ice">{t("Blog", "Блог")}</span>
        </h1>
        <p className="max-w-[560px] text-[clamp(16px,1.6vw,19px)] leading-relaxed text-muted">
          {t(
            "Field notes on building products across the whole stack — engineering, design and the messy space in between. Written to be useful, not to farm keywords.",
            "Полевые заметки о том, как собирать продукты на всём стеке — инженерия, дизайн и мутная зона между ними. Пишу, чтобы было полезно, а не ради ключевых слов."
          )}
        </p>
      </header>

      {/* Posts */}
      <main className="relative mx-auto max-w-[1080px] px-5 pb-16 pt-5 sm:px-10 lg:px-16">
        {!loaded && (
          <div className="font-mono text-sm text-muted-ghost">
            {t("Loading posts...", "Загрузка постов...")}
          </div>
        )}

        {featured && (
          <Reveal className="mb-10">
            <Link
              href={`/blog/${featured.slug}`}
              className="glass-card grid grid-cols-1 overflow-hidden rounded-[22px] transition-all duration-300 hover:-translate-y-1 hover:border-accent/35 md:grid-cols-[1.1fr_.9fr]"
            >
              <div className="flex flex-col justify-center p-[clamp(28px,4vw,46px)]">
                <div className="mb-[18px] flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-[rgba(103,232,249,.12)] px-[11px] py-[5px] font-mono text-[11px] text-[#7bebff]">
                    {t("FEATURED", "ГЛАВНОЕ")}
                  </span>
                  <span className="font-mono text-[11px] text-muted-ghost">{featured.date}</span>
                </div>
                <h2 className="mb-3.5 text-[clamp(24px,3vw,34px)] font-bold leading-[1.1] tracking-tight">
                  {featured.title}
                </h2>
                <p className="mb-[22px] text-[15px] leading-relaxed text-muted-dim">{featured.excerpt}</p>
                <span className="font-mono text-[13px] text-accent">{t("Read", "Читать")} →</span>
              </div>
              <DiamondCover color="#67e8f9" height={240} />
            </Link>
          </Reveal>
        )}

        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
          {rest.map((post, i) => {
            const c = colors[i % colors.length];
            return (
              <Reveal key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="glass-card flex h-full flex-col overflow-hidden rounded-[18px] transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/35 hover:bg-[rgba(103,232,249,.06)]"
                >
                  <DiamondCover color={c} height={120} />
                  <div className="flex flex-1 flex-col p-[22px]">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md px-2.5 py-1 font-mono text-[11px] uppercase"
                          style={{ background: rgba(c, 0.12), color: c }}
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="font-mono text-[11px] text-muted-ghost">{post.date}</span>
                    </div>
                    <h3 className="mb-2.5 text-[17px] font-semibold leading-[1.25]">{post.title}</h3>
                    <p className="text-[13.5px] leading-[1.55] text-muted-dim">{post.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {loaded && filteredPosts.length > 0 && (
          <Reveal className="mt-12">
            <div className="rounded-[20px] border border-dashed border-[rgba(140,180,240,.16)] bg-[rgba(140,180,240,.04)] p-10 text-center">
              <p className="mb-1.5 text-[15px] text-muted-dim">
                {t("More posts are on the way.", "Скоро будут новые статьи.")}
              </p>
              <p className="font-mono text-[13px] text-muted-ghost">
                {t("Subscribe via Telegram — @gr33njj", "Следите в Telegram — @gr33njj")}
              </p>
            </div>
          </Reveal>
        )}
      </main>
    </div>
  );
}
