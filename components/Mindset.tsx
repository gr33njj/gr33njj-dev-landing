"use client";

import { useLanguage } from "@/lib/i18n";
import { Section, SectionTitle } from "./ui/Primitives";

export default function Mindset() {
  const { t } = useLanguage();

  return (
    <Section className="bg-gradient-to-b from-transparent to-accent/5">
      <div className="max-w-3xl mx-auto text-center">
        <SectionTitle>{t("Mindset", "Подход")}</SectionTitle>
        
        <div className="mt-12 space-y-8 text-lg md:text-xl text-zinc-300 leading-relaxed font-light">
          <p>
            {t(
              "I believe in flexible thinking and conscious tool choice. Vibe-coding doesn't mean chaos — it's fast iteration while maintaining engineering discipline.",
              "Я верю в гибкое мышление и осознанный выбор инструментов. Vibe-coding не значит хаос — это быстрая итерация с сохранением инженерной дисциплины."
            )}
          </p>
          <p>
            {t(
              "Technologies are a means, not an end. I choose the right stack for the task, not chasing hype. The main thing is to solve the problem and deliver the result.",
              "Технологии — средство, а не самоцель. Выбираю подходящий стек для задачи, а не гонюсь за хайпом. Главное — решить проблему и доставить результат."
            )}
          </p>
        </div>
      </div>
    </Section>
  );
}


