"use client";

import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { t, toggleLang, lang } = useLanguage();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/#about", en: "About", ru: "Обо мне" },
    { href: "/#projects", en: "Projects", ru: "Проекты" },
    { href: "/#stack", en: "Tech Stack", ru: "Стек" },
    { href: "/blog", en: "Blog", ru: "Блог" },
    { href: "/#contact", en: "Contact", ru: "Контакты" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tighter hover:text-accent transition-colors font-mono">
          gr33njj<span className="text-accent">.dev</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium text-zinc-400 hover:text-white transition-colors",
                pathname === link.href && "text-white"
              )}
            >
              {t(link.en, link.ru)}
            </Link>
          ))}
          
          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="ml-4 px-3 py-1 rounded border border-white/10 text-xs font-mono hover:border-accent/50 hover:text-accent transition-all"
          >
            {lang.toUpperCase()}
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-white/10 p-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              {t(link.en, link.ru)}
            </Link>
          ))}
          <button
            onClick={() => { toggleLang(); setIsOpen(false); }}
            className="text-left text-sm font-mono text-accent"
          >
            Switch to {lang === "en" ? "RU" : "EN"}
          </button>
        </div>
      )}
    </header>
  );
}


