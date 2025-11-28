"use client";

import { useLanguage } from "@/lib/i18n";
import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative pt-16">
      <div className="max-w-4xl mx-auto text-center z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-accent/20 rounded-full bg-accent/5 backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm font-mono text-accent/80 tracking-wide">
            {t("AVAILABLE FOR PROJECTS", "ДОСТУПЕН ДЛЯ ПРОЕКТОВ")}
          </span>
        </div>

        {/* Title - Changed to font-mono for technocratic look */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-[1.1] font-mono">
          <span className="block">{t("Multitool Engineer", "Мультитул Инженер")}</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white/70">
            {t("Conscious Vibe Coder", "Осознанный Vibe Coder")}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          {t(
            "Turning flexibility into real production-grade results. Backend, DevOps, monitoring, automation — consciously using tools to deliver outcomes.",
            "Превращаю гибкость в реальные production-ready решения. Backend, DevOps, мониторинг, автоматизация — осознанно использую инструменты для результата."
          )}
        </p>

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="#contact"
            className="group px-8 py-4 bg-accent text-white font-medium rounded-lg hover:bg-accent-hover transition-all flex items-center gap-2 shadow-lg shadow-accent/20 font-mono"
          >
            {t("Get in Touch", "Связаться")}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            href="#projects"
            className="px-8 py-4 bg-surface border border-white/10 text-white font-medium rounded-lg hover:border-accent/50 transition-all flex items-center gap-2 font-mono"
          >
            <Terminal size={18} />
            {t("View Projects", "Смотреть Проекты")}
          </Link>
        </div>
      </div>
    </section>
  );
}
