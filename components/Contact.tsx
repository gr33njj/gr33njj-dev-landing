"use client";

import { useLanguage } from "@/lib/i18n";
import { Github, Instagram, Twitter, Youtube, Mail, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const socials = [
    { icon: <Github size={18} />, href: "https://github.com/gr33njj", label: "GitHub" },
    { icon: <Twitter size={16} />, href: "https://x.com/stockytiger", label: "X" },
    { icon: <Instagram size={18} />, href: "https://www.instagram.com/gr33njj/", label: "Instagram" },
    { icon: <Youtube size={18} />, href: "https://www.youtube.com/@%D0%94%D0%B0%D0%BD%D0%B8%D0%BB%D0%93%D0%BB%D1%83%D1%85%D0%BE%D0%BD%D1%87%D1%83%D0%BA", label: "YouTube" },
  ];

  const inputClass =
    "rounded-[11px] border border-[rgba(140,180,240,.18)] bg-[rgba(6,8,15,.4)] px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-ghost focus:border-accent/50";

  return (
    <section id="contact" className="relative scroll-mt-20 px-5 py-[90px] pb-16 sm:px-10 lg:px-16">
      <div className="relative mx-auto max-w-[1000px] overflow-hidden rounded-[28px] border border-[rgba(140,180,240,.16)] bg-[linear-gradient(135deg,rgba(103,232,249,.08),rgba(154,19,232,.1))] p-[clamp(28px,6vw,72px)] backdrop-blur-2xl">
        <div
          className="pointer-events-none absolute -right-[10%] -top-[30%] h-[160%] w-2/5"
          style={{ background: "radial-gradient(circle, rgba(103,232,249,.16), transparent 65%)", filter: "blur(20px)" }}
        />
        <div className="relative grid grid-cols-1 gap-11 md:grid-cols-2">
          <div>
            <div className="mb-4 font-mono text-xs uppercase tracking-[.16em] text-accent">
              04 — {t("Contact", "Контакт")}
            </div>
            <h2 className="mb-4 text-[clamp(30px,4vw,46px)] font-bold leading-[1.05] tracking-tight">
              {t("Let's build the thing", "Давай соберём продукт")}
            </h2>
            <p className="mb-7 leading-relaxed text-muted">
              {t(
                "Tell me the task in two lines and I will come back with a plan, a price and a timeline. No jargon, no runaround.",
                "Опишите задачу в двух строках — вернусь с планом, ценой и сроком. Без жаргона и хождения вокруг."
              )}
            </p>

            <div className="mb-6 flex flex-col gap-3">
              <a
                href="mailto:jj.gr33nrec@gmail.com"
                className="inline-flex items-center gap-3 font-mono text-sm text-foreground transition-colors hover:text-accent"
              >
                <Mail size={16} className="text-accent" /> jj.gr33nrec@gmail.com
              </a>
              <a
                href="https://t.me/gr33njj"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-mono text-sm text-foreground transition-colors hover:text-accent"
              >
                <Send size={16} className="text-accent-blue" /> @gr33njj
              </a>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[11px] border border-[rgba(140,180,240,.16)] bg-surface text-[#b9c6e0] transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              name="name"
              required
              placeholder={t("Your name", "Ваше имя")}
              className={inputClass}
            />
            <input
              name="email"
              type="email"
              required
              placeholder={t("Email", "Email")}
              className={inputClass}
            />
            <textarea
              name="message"
              rows={4}
              required
              placeholder={t("What are you building?", "Что вы строите?")}
              className={`${inputClass} resize-none`}
            />
            <button
              disabled={status === "sending"}
              className="rounded-[11px] bg-gradient-ice p-[15px] text-[15px] font-semibold text-[#04121a] shadow-[0_10px_30px_rgba(103,232,249,.28)] transition-transform hover:scale-[1.01] disabled:opacity-50"
            >
              {status === "sending" ? "..." : t("Send it →", "Отправить →")}
            </button>

            {status === "success" && (
              <p className="font-mono text-sm text-accent-mint">
                {t("Sent! I'll reply within a day.", "Отправлено! Отвечу в течение суток.")}
              </p>
            )}
            {status === "error" && (
              <p className="font-mono text-sm text-red-400">
                {t("Something broke — write me directly.", "Что-то сломалось — напишите мне напрямую.")}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
