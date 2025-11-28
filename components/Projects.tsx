"use client";

import { useLanguage } from "@/lib/i18n";
import { Card, Section, SectionTitle, Badge } from "./ui/Primitives";
import { Github } from "lucide-react";

export default function Projects() {
  const { t } = useLanguage();

  const projects = [
    {
      title: "lis-mini",
      desc: t(
        "Lightweight CRM for small business. Fast deployment, minimalistic interface.",
        "Легкая CRM для малого бизнеса. Быстрый деплой, минималистичный интерфейс."
      ),
      result: t("Simplifies client management.", "Упрощает управление клиентами."),
      stack: ["Python", "FastAPI", "React", "PostgreSQL"],
      link: "https://github.com/gr33njj/lis-mini",
    },
    {
      title: "skangar-landing",
      desc: t(
        "Modern landing page with focus on product presentation.",
        "Современный лендинг с фокусом на презентации продукта."
      ),
      result: t("High conversion rate design.", "Дизайн с высокой конверсией."),
      stack: ["Next.js", "Tailwind", "Framer Motion"],
      link: "https://github.com/gr33njj/skangar-landing",
    },
    {
      title: "mydoc-loyalty",
      desc: t(
        "Loyalty system for medical clinic with bonuses and visit history.",
        "Система лояльности для клиники с бонусами и историей посещений."
      ),
      result: t("Automated bonus accrual.", "Автоматизированное начисление бонусов."),
      stack: ["FastAPI", "PostgreSQL", "Docker"],
      link: "https://github.com/gr33njj/mydoc-loyalty",
    },
    {
      title: "telemedicine",
      desc: t(
        "Platform for online doctor consultations with WebRTC.",
        "Платформа для онлайн-консультаций с WebRTC."
      ),
      result: t("MVP launched successfully.", "MVP успешно запущен."),
      stack: ["Python", "WebRTC", "Redis"],
      link: "https://github.com/gr33njj/telemedicine",
    },
    {
      title: "tron-staking-app",
      desc: t(
        "Experimental TRX staking app with yield tracking.",
        "Экспериментальное приложение для стейкинга TRX."
      ),
      result: t("Blockchain mechanics explored.", "Изучены механики блокчейна."),
      stack: ["Web3", "React", "Tron API"],
      link: "https://github.com/gr33njj/tron-staking-app",
    },
  ];

  return (
    <Section id="projects" className="bg-black/20">
      <div className="mb-16 text-center">
        <SectionTitle>{t("Selected Projects", "Избранные Проекты")}</SectionTitle>
        <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
          {t(
            "Real cases demonstrating engineering approach and delivery.",
            "Реальные кейсы, демонстрирующие инженерный подход и результат."
          )}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <Card key={i} className="flex flex-col h-full group hover:border-accent/40 hover:bg-accent/5 transition-all duration-500">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-accent font-mono group-hover:text-white transition-colors">
                {p.title}
              </h3>
              {p.link && (
                <a 
                  href={p.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-accent transition-colors p-2 hover:bg-accent/10 rounded-full"
                >
                  <Github size={20} />
                </a>
              )}
            </div>
            
            <div className="flex-grow space-y-4">
              <div>
                <span className="text-xs text-zinc-500 uppercase tracking-wider font-bold block mb-1 font-mono">
                  {t("Solution", "Решение")}
                </span>
                <p className="text-zinc-300">{p.desc}</p>
              </div>
              
              <div>
                <span className="text-xs text-zinc-500 uppercase tracking-wider font-bold block mb-1 font-mono">
                  {t("Result", "Результат")}
                </span>
                <p className="text-zinc-300">{p.result}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-2">
              {p.stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
