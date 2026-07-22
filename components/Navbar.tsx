"use client";

import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { t, lang, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/#facets", en: "What I do", ru: "Что умею" },
    { href: "/#work", en: "Work", ru: "Работы" },
    { href: "/#approach", en: "Approach", ru: "Подход" },
    { href: "/blog", en: "Blog", ru: "Блог" },
  ];

  const langBtn = (code: "en" | "ru") =>
    cn(
      "px-3 py-[5px] rounded-full font-mono text-xs transition-all",
      lang === code
        ? "bg-gradient-ice text-[#04121a] font-semibold"
        : "text-muted-faint hover:text-foreground"
    );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-[rgba(6,8,15,.55)] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-5 px-5 py-3.5 sm:px-10 lg:px-16">
        {/* Logo */}
        <Link href="/" className="font-mono text-[17px] font-medium tracking-wide text-foreground">
          gr
          <span className="bg-gradient-ice bg-clip-text font-bold text-transparent">33</span>
          njj<span className="text-accent-hover">.dev</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-accent"
            >
              {t(link.en, link.ru)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language pill */}
          <div className="inline-flex rounded-full border border-line bg-surface p-[3px]">
            <button onClick={() => setLanguage("en")} className={langBtn("en")}>
              EN
            </button>
            <button onClick={() => setLanguage("ru")} className={langBtn("ru")}>
              RU
            </button>
          </div>

          {/* CTA */}
          <Link
            href="/#contact"
            className="hidden items-center gap-2 rounded-full bg-gradient-ice px-[18px] py-[9px] text-[13px] font-semibold text-[#04121a] shadow-[0_6px_22px_rgba(103,232,249,.28)] transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            {t("Start a project", "Начать проект")}
          </Link>

          {/* Mobile Menu Toggle */}
          <button className="text-foreground md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full flex flex-col gap-4 border-b border-line bg-[rgba(6,8,15,.95)] p-5 backdrop-blur-xl md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              {t(link.en, link.ru)}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setIsOpen(false)}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-ice px-[18px] py-[9px] text-[13px] font-semibold text-[#04121a]"
          >
            {t("Start a project", "Начать проект")}
          </Link>
        </div>
      )}
    </header>
  );
}
