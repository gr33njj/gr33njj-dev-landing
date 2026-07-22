"use client";

import { useLanguage } from "@/lib/i18n";
import Reveal from "./ui/Reveal";
import { PanelsTopLeft, Database, Layers, PenTool } from "lucide-react";

export default function Services() {
  const { t } = useLanguage();

  const facets = [
    {
      icon: <PanelsTopLeft size={24} />,
      iconClass: "text-[#7bebff] bg-[linear-gradient(135deg,rgba(103,232,249,.2),rgba(168,85,247,.12))] border-[rgba(140,200,255,.22)]",
      tagClass: "text-accent",
      tag: "FRONTEND",
      title: t("Interfaces people trust", "Интерфейсы, которым верят"),
      desc: t(
        "Pixel-clean UI, smooth motion and fast loads — the polish clients feel before they can name it.",
        "Чистый до пикселя UI, плавные анимации и быстрая загрузка — та самая «дороговизна», которую клиент чувствует раньше, чем осознаёт."
      ),
    },
    {
      icon: <Database size={24} />,
      iconClass: "text-[#c79bff] bg-[linear-gradient(135deg,rgba(168,85,247,.2),rgba(103,232,249,.12))] border-[rgba(180,150,255,.22)]",
      tagClass: "text-accent-purple",
      tag: "BACKEND",
      title: t("Systems that hold", "Системы, которые держат"),
      desc: t(
        "APIs, databases, auth and infrastructure built to scale quietly instead of breaking loudly.",
        "API, базы, авторизация и инфраструктура, собранные так, чтобы тихо масштабироваться, а не громко падать."
      ),
    },
    {
      icon: <Layers size={24} />,
      iconClass: "text-[#7bd4ff] bg-[linear-gradient(135deg,rgba(56,189,248,.2),rgba(168,85,247,.14))] border-[rgba(140,200,255,.22)]",
      tagClass: "text-accent-blue",
      tag: "FULLSTACK",
      title: t("The whole loop", "Весь цикл"),
      desc: t(
        "From the data model to the exact button a user clicks — one head keeps the whole thing coherent.",
        "От модели данных до конкретной кнопки, на которую жмёт пользователь — одна голова держит всё связным."
      ),
    },
    {
      icon: <PenTool size={24} />,
      iconClass: "text-[#d0a6ff] bg-[linear-gradient(135deg,rgba(103,232,249,.16),rgba(168,85,247,.22))] border-[rgba(180,150,255,.22)]",
      tagClass: "text-accent-purple",
      tag: t("DESIGN", "ДИЗАЙН"),
      title: t("It looks expensive", "Выглядит дорого"),
      desc: t(
        "Layout, brand and UX that make you look serious to your own clients and investors.",
        "Композиция, бренд и UX, которые заставляют вас выглядеть серьёзно перед вашими же клиентами и инвесторами."
      ),
    },
  ];

  return (
    <section id="facets" className="relative mx-auto max-w-[1280px] scroll-mt-20 px-5 py-24 sm:px-10 lg:px-16">
      <Reveal className="mb-14 max-w-[640px]">
        <div className="mb-4 font-mono text-xs uppercase tracking-[.16em] text-accent">
          01 — {t("What I do", "Что умею")}
        </div>
        <h2 className="mb-4 text-[clamp(30px,4.4vw,52px)] font-bold leading-[1.04] tracking-tight">
          {t("Approached from every angle", "Взгляд со всех граней")}
        </h2>
        <p className="text-[17px] leading-relaxed text-muted">
          {t(
            "Most projects break at the seams between disciplines. I work every facet at once — so there are no seams to break.",
            "Большинство проектов ломается на стыке дисциплин. Я работаю на всех гранях сразу — поэтому стыков, которые могли бы сломаться, просто нет."
          )}
        </p>
      </Reveal>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[18px]">
        {facets.map((f) => (
          <Reveal key={f.tag}>
            <div className="glass-card h-full rounded-[18px] p-[30px] transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/35 hover:bg-[rgba(103,232,249,.06)]">
              <div className={`mb-[22px] inline-flex h-12 w-12 items-center justify-center rounded-[13px] border ${f.iconClass}`}>
                {f.icon}
              </div>
              <div className={`mb-2 font-mono text-[11px] tracking-[.1em] ${f.tagClass}`}>{f.tag}</div>
              <h3 className="mb-2.5 text-xl font-semibold">{f.title}</h3>
              <p className="text-sm leading-[1.55] text-muted-dim">{f.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
