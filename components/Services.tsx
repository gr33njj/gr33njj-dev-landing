"use client";

import { useLanguage } from "@/lib/i18n";
import { Card, Section, SectionTitle } from "./ui/Primitives";
import { Database, Server, Layout, FlaskConical } from "lucide-react";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Database className="text-accent" size={32} />,
      title: "Backend & APIs",
      desc: t(
        "FastAPI, REST, databases. Designing and implementing reliable, scalable backend systems.",
        "FastAPI, REST, базы данных. Проектирование и реализация надежных backend-систем."
      ),
    },
    {
      icon: <Server className="text-accent" size={32} />,
      title: t("DevOps & Infrastructure", "DevOps & Инфраструктура"),
      desc: t(
        "Docker, CI/CD, monitoring. Automating deployment and ensuring system stability.",
        "Docker, CI/CD, мониторинг. Автоматизация деплоя и обеспечение стабильности систем."
      ),
    },
    {
      icon: <Layout className="text-accent" size={32} />,
      title: t("Frontend & Interfaces", "Frontend & Интерфейсы"),
      desc: t(
        "React, dashboards, landing pages. Creating clean, functional user interfaces.",
        "React, дашборды, лендинги. Создание чистых и функциональных интерфейсов."
      ),
    },
    {
      icon: <FlaskConical className="text-accent" size={32} />,
      title: t("Experiments & R&D", "Эксперименты & R&D"),
      desc: t(
        "Crypto, automation, protocols. Exploring new tech and building prototypes.",
        "Крипта, автоматизация, протоколы. Исследование технологий и создание прототипов."
      ),
    },
  ];

  return (
    <Section id="what-i-do" className="relative z-10">
      <div className="mb-16 text-center">
        <SectionTitle>{t("What I Do", "Чем я занимаюсь")}</SectionTitle>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {services.map((s, i) => (
          <Card key={i} className="h-full">
            <div className="mb-6 p-3 bg-white/5 w-fit rounded-lg border border-white/5">
              {s.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 font-mono">{s.title}</h3>
            <p className="text-zinc-400 leading-relaxed">{s.desc}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}


