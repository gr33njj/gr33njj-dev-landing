"use client";

import { useLanguage } from "@/lib/i18n";
import { Section, SectionTitle, Card } from "./ui/Primitives";
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
    { icon: <Send size={20} />, href: "https://t.me/gr33njj", label: "Telegram" },
    { icon: <Github size={20} />, href: "https://github.com/gr33njj", label: "GitHub" },
    { icon: <Instagram size={20} />, href: "https://www.instagram.com/gr33njj/", label: "Instagram" },
    { icon: <Twitter size={20} />, href: "https://x.com/stockytiger", label: "Twitter" },
    { icon: <Youtube size={20} />, href: "https://www.youtube.com/@%D0%94%D0%B0%D0%BD%D0%B8%D0%BB%D0%93%D0%BB%D1%83%D1%85%D0%BE%D0%BD%D1%87%D1%83%D0%BA", label: "YouTube" },
  ];

  return (
    <Section id="contact">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <SectionTitle>{t("Get in Touch", "Связаться")}</SectionTitle>
          <p className="text-zinc-400 mb-8 mt-4 text-lg">
            {t(
              "Open for new projects, consulting, and interesting experiments.",
              "Открыт для новых проектов, консультаций и интересных экспериментов."
            )}
          </p>

          <div className="flex flex-wrap gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                className="p-3 rounded-lg bg-surface border border-white/10 text-zinc-400 hover:text-accent hover:border-accent/50 transition-all"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
          
          <div className="mt-8">
            <a href="mailto:jj.gr33nrec@gmail.com" className="text-xl font-mono hover:text-accent transition-colors">
              jj.gr33nrec@gmail.com
            </a>
          </div>
        </div>

        <Card className="p-8" hover={false}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-mono text-zinc-500 mb-2">{t("Name", "Имя")}</label>
              <input 
                name="name" 
                required 
                className="w-full bg-background border border-white/10 rounded p-3 focus:border-accent outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-mono text-zinc-500 mb-2">Email</label>
              <input 
                name="email" 
                type="email" 
                required 
                className="w-full bg-background border border-white/10 rounded p-3 focus:border-accent outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-mono text-zinc-500 mb-2">{t("Message", "Сообщение")}</label>
              <textarea 
                name="message" 
                rows={4} 
                required 
                className="w-full bg-background border border-white/10 rounded p-3 focus:border-accent outline-none transition-colors"
              />
            </div>
            <button 
              disabled={status === "sending"}
              className="w-full py-3 bg-accent text-white font-bold rounded hover:bg-accent-hover disabled:opacity-50 transition-all"
            >
              {status === "sending" ? "..." : t("Send", "Отправить")}
            </button>
            
            {status === "success" && <p className="text-green-500 text-sm mt-2">{t("Sent!", "Отправлено!")}</p>}
            {status === "error" && <p className="text-red-500 text-sm mt-2">{t("Error.", "Ошибка.")}</p>}
          </form>
        </Card>
      </div>
    </Section>
  );
}


