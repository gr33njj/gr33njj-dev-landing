"use client";

import { useLanguage } from "@/lib/i18n";
import Reveal from "./ui/Reveal";

export default function Mindset() {
  const { t } = useLanguage();

  const steps = [
    {
      color: "text-accent",
      title: t("I speak outcomes, not stacks", "Говорю на языке результата"),
      desc: t(
        "You tell me the goal; I translate it into a build and a timeline in language you can repeat to your boss.",
        "Вы называете цель — я перевожу её в сборку и сроки на языке, который вы спокойно повторите руководству."
      ),
    },
    {
      color: "text-accent-purple",
      title: t("One person accountable", "Один ответственный"),
      desc: t(
        "No hand-offs between three contractors. One head owns design, code and delivery from first call to launch.",
        "Никаких передач между тремя подрядчиками. Одна голова держит дизайн, код и сдачу от первого звонка до запуска."
      ),
    },
    {
      color: "text-accent-blue",
      title: t("Working demos, not promises", "Рабочие демо, не обещания"),
      desc: t(
        "You see something real early and often — so trust is earned by proof, not by invoices.",
        "Вы видите что-то настоящее рано и часто — доверие строится на доказательствах, а не на счетах."
      ),
    },
    {
      color: "text-accent-purple",
      title: t("Code that outlives launch", "Код, который переживёт запуск"),
      desc: t(
        "Clean, documented and maintainable — so the next developer thanks you instead of rewriting everything.",
        "Чистый, задокументированный и поддерживаемый — чтобы следующий разработчик сказал спасибо, а не переписывал всё заново."
      ),
    },
  ];

  return (
    <section id="approach" className="relative scroll-mt-20 px-5 py-[90px] sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <div className="mb-4 font-mono text-xs uppercase tracking-[.16em] text-accent">
            03 — {t("Approach", "Подход")}
          </div>
          <h2 className="mb-5 text-[clamp(30px,4.4vw,52px)] font-bold leading-[1.04] tracking-tight">
            {t("How I actually work", "Как я работаю на самом деле")}
          </h2>
          <p className="mb-7 text-[17px] leading-relaxed text-muted">
            {t(
              "You do not need to understand the tech. You need someone who owns the result, speaks plainly, and shows working things — not slides full of promises.",
              "Вам не нужно разбираться в технологиях. Вам нужен тот, кто отвечает за результат, говорит по-человечески и показывает работающие вещи, а не слайды с обещаниями."
            )}
          </p>
          <div className="inline-flex items-center gap-3.5 rounded-[14px] border border-line bg-[rgba(140,180,240,.05)] px-5 py-4 backdrop-blur-md">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-ice font-mono text-[17px] font-bold tracking-[-1px] text-[#04121a]">
              33
            </div>
            <div>
              <div className="text-sm font-semibold">gr33njj</div>
              <div className="font-mono text-xs text-muted-faint">
                {t("multitool engineer", "инженер-мультитул")}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-3.5">
          {steps.map((s, i) => (
            <Reveal key={s.title}>
              <div className="flex gap-[18px] rounded-2xl border border-[rgba(140,180,240,.1)] bg-[rgba(140,180,240,.04)] p-[22px]">
                <div className={`pt-0.5 font-mono text-[13px] ${s.color}`}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="mb-1.5 text-lg font-semibold">{s.title}</h3>
                  <p className="text-sm leading-[1.55] text-muted-dim">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
