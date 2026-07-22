"use client";

import { useLanguage } from "@/lib/i18n";
import Reveal from "./ui/Reveal";

const items = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "FastAPI",
  "PostgreSQL", "Redis", "Docker", "Kubernetes", "CI/CD", "Nginx",
  "Prometheus", "Grafana", "Tailwind", "Figma",
];

function Row() {
  return (
    <div className="flex gap-3.5">
      {items.map((s) => (
        <div
          key={s}
          className="flex-none whitespace-nowrap rounded-xl border border-line bg-[rgba(140,180,240,.05)] px-[22px] py-3 font-mono text-sm text-[#b9c6e0] backdrop-blur-md"
        >
          {s}
        </div>
      ))}
    </div>
  );
}

export default function Stack() {
  const { t } = useLanguage();

  return (
    <section id="stack" className="relative overflow-hidden py-10 pb-16">
      <Reveal className="mb-8 px-5 text-center">
        <div className="font-mono text-xs uppercase tracking-[.16em] text-accent">
          {t("Tools I reach for", "Чем работаю")}
        </div>
      </Reveal>
      <div
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee gap-3.5">
          <Row />
          <Row />
        </div>
      </div>
    </section>
  );
}
