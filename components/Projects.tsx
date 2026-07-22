"use client";

import { useLanguage } from "@/lib/i18n";
import Reveal from "./ui/Reveal";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";

function rgba(hex: string, a: number) {
  const n = hex.replace("#", "");
  const r = parseInt(n.substring(0, 2), 16);
  const g = parseInt(n.substring(2, 4), 16);
  const b = parseInt(n.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

interface Project {
  title: string;
  color: string;
  tags: string[];
  desc: string;
  result: string;
  stack: string[];
  link?: string;
  caseHref?: string;
  cover?: string;
}

export default function Projects() {
  const { t } = useLanguage();

  const projects: Project[] = [
    {
      title: "lis-mini",
      color: "#67e8f9",
      tags: ["Fullstack", "CRM"],
      desc: t(
        "Lightweight CRM for small business: fast deployment, minimal interface, no training needed.",
        "Лёгкая CRM для малого бизнеса: быстрый деплой, минималистичный интерфейс, не требует обучения."
      ),
      result: t("Client management without the bloat.", "Управление клиентами без лишнего веса."),
      stack: ["Python", "FastAPI", "React", "PostgreSQL"],
      link: "https://github.com/gr33njj/lis-mini",
    },
    {
      title: "skangar-landing",
      color: "#a855f7",
      tags: ["SEO", "Content"],
      desc: t(
        "A landing page that outgrew itself into content infrastructure: 75 city pages with real regional specifics, a 13-article knowledge base with a 37-term glossary.",
        "Лендинг, который дорос до content-инфраструктуры: 75 городских страниц с региональной спецификой, база знаний из 13 статей и глоссарий на 37 терминов."
      ),
      result: t("Structured data on every page, cluster internal linking.", "Структурированные данные на каждой странице, кластерная перелинковка."),
      stack: ["Python", "Jinja", "JSON-LD", "nginx"],
      link: "https://github.com/gr33njj/skangar-landing",
      caseHref: "/case/skangar",
      cover: "/case/skangar/hero.webp",
    },
    {
      title: "mydoc-loyalty",
      color: "#38bdf8",
      tags: ["PWA", "Android", "iOS"],
      desc: t(
        "Loyalty and booking app for a medical clinic: online appointments, e-records, bonuses and gift cards — live in Google Play and RuStore.",
        "Приложение лояльности и записи для медклиники: онлайн-запись, медкарта, бонусы и сертификаты — уже в Google Play и RuStore."
      ),
      result: t("Shipped product used by real patients.", "Готовый продукт, которым пользуются реальные пациенты."),
      stack: ["FastAPI", "PostgreSQL", "Redis", "Docker"],
      link: "https://github.com/gr33njj/mydoc-loyalty",
      caseHref: "/case/mydoctor",
      cover: "/case/mydoctor/feature-graphic.webp",
    },
    {
      title: "telemedicine",
      color: "#34f5c5",
      tags: ["Fullstack", "WebRTC"],
      desc: t(
        "Platform for online doctor consultations with real-time video over WebRTC.",
        "Платформа для онлайн-консультаций врачей с видео в реальном времени через WebRTC."
      ),
      result: t("MVP launched and validated.", "MVP запущен и проверен на пользователях."),
      stack: ["Python", "WebRTC", "Redis"],
      link: "https://github.com/gr33njj/telemedicine",
    },
    {
      title: "tron-staking-app",
      color: "#c79bff",
      tags: ["Web3", "R&D"],
      desc: t(
        "Experimental TRX staking app with yield tracking — a deep dive into blockchain mechanics.",
        "Экспериментальное приложение для стейкинга TRX с трекингом доходности — глубокое погружение в механики блокчейна."
      ),
      result: t("From zero to working on-chain flow.", "От нуля до рабочего on-chain процесса."),
      stack: ["Web3", "React", "Tron API"],
      link: "https://github.com/gr33njj/tron-staking-app",
    },
    {
      title: "TRAD3",
      color: "#fbbf24",
      tags: ["Trading", "Automation"],
      desc: t(
        "A reversal-detection system for crypto perpetuals: weighted scoring instead of a rigid state machine, no repainting, alerts straight to Telegram.",
        "Система детекции разворотов на криптоперпетуумах: взвешенный скоринг вместо жёсткой цепочки состояний, без перерисовки, алерты прямо в Telegram."
      ),
      result: t("27 instruments tracked 24/7, running in paper mode.", "27 инструментов под наблюдением 24/7, работает в paper-режиме."),
      stack: ["Python", "FastAPI", "SQLite", "Telegram Bot API"],
      link: "https://trade.gr33njj.dev",
      caseHref: "/case/trad3",
      cover: "/case/trad3/signals-list.webp",
    },
    {
      title: "GAZON",
      color: "#22d3ee",
      tags: ["AI Agents", "CI/CD"],
      desc: t(
        "A Unity 6 WebGL game built almost entirely through CI — a self-hosted runner, headless Claude Code and a scene generated from code, with no Unity Editor on the server.",
        "Unity 6 WebGL-игра, которая собирается почти полностью через CI — self-hosted раннер, headless Claude Code и сцена, генерируемая из кода, без Unity Editor на сервере."
      ),
      result: t("13 issues closed by one agent commit.", "13 issues закрыто одним коммитом агента."),
      stack: ["Unity 6", "C#", "GitHub Actions", "Claude Code"],
      link: "https://ai.gr33njj.dev",
      caseHref: "/case/gazon",
      cover: "/case/gazon/feature.webp",
    },
  ];

  return (
    <section id="work" className="relative mx-auto max-w-[1280px] scroll-mt-20 px-5 py-20 pb-24 sm:px-10 lg:px-16">
      <Reveal className="mb-11 max-w-[640px]">
        <div className="mb-4 font-mono text-xs uppercase tracking-[.16em] text-accent">
          02 — {t("Work", "Работы")}
        </div>
        <h2 className="mb-3.5 text-[clamp(30px,4.4vw,52px)] font-bold leading-[1.04] tracking-tight">
          {t("Selected work", "Избранные работы")}
        </h2>
        <p className="text-[17px] leading-relaxed text-muted">
          {t(
            "A few things I have shipped — real cases with code on GitHub. Ask me for the live ones.",
            "Несколько запусков — реальные кейсы с кодом на GitHub. Напишите мне за живыми ссылками."
          )}
        </p>
      </Reveal>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
        {projects.map((p) => (
          <Reveal key={p.title}>
            <div className="glass-card flex h-full flex-col overflow-hidden rounded-[20px] transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/35">
              {/* Visual header: real cover for shipped cases, decorative diamond otherwise */}
              {p.cover && p.caseHref ? (
                <Link href={p.caseHref} className="relative block h-[120px] overflow-hidden">
                  <img
                    src={p.cover}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </Link>
              ) : (
                <div
                  className="relative h-[120px] overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${rgba(p.color, 0.16)}, rgba(154,19,232,.14))` }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <div
                    className="absolute left-1/2 top-1/2 h-[52px] w-[52px] rotate-45 border border-[rgba(180,235,255,.4)]"
                    style={{
                      margin: "-26px 0 0 -26px",
                      background: `linear-gradient(135deg, ${rgba(p.color, 0.3)}, rgba(168,85,247,.24))`,
                      boxShadow: `inset 0 0 20px ${rgba(p.color, 0.35)}`,
                    }}
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col p-[22px]">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md px-2.5 py-1 font-mono text-[11px]"
                      style={{ background: rgba(p.color, 0.12), color: p.color }}
                    >
                      {tag}
                    </span>
                  ))}
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={p.title}
                      className="ml-auto text-muted-faint transition-colors hover:text-accent"
                    >
                      {p.link.includes("github.com") ? <Github size={18} /> : <ExternalLink size={18} />}
                    </a>
                  )}
                </div>
                <h3 className="mb-2 font-mono text-[19px] font-semibold">{p.title}</h3>
                <p className="mb-3 text-sm leading-[1.55] text-muted-dim">{p.desc}</p>
                <p className="mt-auto text-sm leading-[1.55]">
                  <span className="font-mono text-[11px] uppercase tracking-[.1em] text-accent-mint">
                    {t("Result", "Результат")}
                  </span>
                  <span className="mt-1 block text-muted">{p.result}</span>
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-3.5">
                  {p.stack.map((tech) => (
                    <span key={tech} className="font-mono text-[11px] text-muted-faint">
                      {tech}
                    </span>
                  ))}
                  {p.caseHref && (
                    <Link
                      href={p.caseHref}
                      className="ml-auto font-mono text-[12px] text-accent transition-colors hover:text-accent-hover"
                    >
                      {t("View case", "Смотреть кейс")} →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
