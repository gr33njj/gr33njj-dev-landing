"use client";

import { useLanguage } from "@/lib/i18n";
import { Card, Section, SectionTitle } from "./ui/Primitives";

export default function Stack() {
  const { t } = useLanguage();

  const stacks = [
    {
      category: "Backend",
      items: ["Python", "FastAPI", "Node.js", "PostgreSQL", "Redis", "Go"],
    },
    {
      category: "DevOps",
      items: ["Docker", "Kubernetes", "CI/CD", "Linux", "Nginx", "Ansible"],
    },
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    },
    {
      category: t("Monitoring", "Мониторинг"),
      items: ["Prometheus", "Grafana", "Zabbix", "ELK"],
    },
  ];

  return (
    <Section id="stack">
      <div className="mb-12 text-center">
        <SectionTitle>{t("Tech Stack", "Технологии")}</SectionTitle>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stacks.map((s, i) => (
          <Card key={i} hover={false} className="bg-surface/30">
            <h3 className="text-lg font-bold mb-4 text-accent font-mono">{s.category}</h3>
            <div className="flex flex-wrap gap-2">
              {s.items.map((item) => (
                <span key={item} className="text-sm text-zinc-400 flex items-center">
                  <span className="w-1.5 h-1.5 bg-accent/50 rounded-full mr-2" />
                  {item}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}


