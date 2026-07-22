"use client";

import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import { useEffect, useRef } from "react";

const face = (transform: string, background: string, boxShadow: string): React.CSSProperties => ({
  position: "absolute",
  inset: 0,
  transform,
  border: "1px solid rgba(160,225,255,.4)",
  background,
  boxShadow,
});

export default function Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* Cube parallax tilt */
  useEffect(() => {
    const hero = sectionRef.current;
    const tilt = tiltRef.current;
    if (!hero || !tilt) return;
    const onMove = (ev: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      const nx = ((ev.clientX - r.left) / r.width - 0.5) * 2;
      const ny = ((ev.clientY - r.top) / r.height - 0.5) * 2;
      tilt.style.transform = `rotateX(${-14 - ny * 10}deg) rotateY(${nx * 14}deg)`;
    };
    hero.addEventListener("mousemove", onMove);
    return () => hero.removeEventListener("mousemove", onMove);
  }, []);

  /* Particle constellation */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const N = Math.min(70, Math.floor(w / 16));
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.8 + 0.4,
    }));
    const mouse = { x: -999, y: -999 };
    const onMouse = (e: MouseEvent) => {
      const rr = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rr.left;
      mouse.y = e.clientY - rr.top;
    };
    const parent = canvas.parentElement;
    parent?.addEventListener("mousemove", onMouse);

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dxm = p.x - mouse.x;
        const dym = p.y - mouse.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < 120 && dm > 0) {
          p.x += (dxm / dm) * 0.8;
          p.y += (dym / dm) * 0.8;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(150,220,255,0.55)";
        ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(120,200,255,${(1 - d / 110) * 0.18})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      parent?.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative grid min-h-screen scroll-mt-24 grid-cols-1 items-center gap-10 px-5 pb-20 pt-[130px] sm:px-10 lg:grid-cols-[1.05fr_.95fr] lg:px-16"
    >
      {/* SVG liquid filter for the backdrop word */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="liquid">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.014" numOctaves="2" seed="7" result="n">
              <animate attributeName="baseFrequency" dur="18s" values="0.008 0.014;0.014 0.02;0.008 0.014" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="26" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div className="pointer-events-none absolute inset-0 -z-[1]">
        <canvas ref={canvasRef} className="block h-full w-full" />
      </div>

      {/* Copy */}
      <div className="max-w-[620px]">
        <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-[7px] font-mono text-xs tracking-wider text-[#9fe9ff]">
          <span className="h-[7px] w-[7px] rounded-full bg-accent-mint shadow-[0_0_10px_#34f5c5]" />
          {t("Fullstack · Frontend · Backend · Design", "Fullstack · Frontend · Backend · Дизайн")}
        </div>

        <h1 className="mb-6 text-[clamp(38px,6vw,78px)] font-bold leading-[0.98] tracking-tight">
          <span className="block">{t("Every facet", "Все грани")}</span>
          <span className="block">{t("of your product,", "вашего продукта —")}</span>
          <span className="block animate-shimmer text-gradient-ice">
            {t("one engineer.", "один инженер.")}
          </span>
        </h1>

        <p className="mb-8 max-w-[520px] text-[clamp(16px,1.5vw,19px)] leading-relaxed text-muted">
          {t(
            "I turn raw ideas into products that look expensive and ship on time. Frontend, backend, architecture, design — handled end to end, without a five-person team.",
            "Превращаю сырые идеи в продукты, которые выглядят дорого и выходят в срок. Фронтенд, бэкенд, архитектура, дизайн — под ключ, без команды из пяти человек."
          )}
        </p>

        <div className="mb-10 flex flex-wrap gap-3.5">
          <Link
            href="#contact"
            className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-gradient-ice px-[26px] py-[15px] text-[15px] font-semibold text-[#04121a] shadow-[0_10px_34px_rgba(103,232,249,.3)] transition-transform hover:scale-[1.02]"
          >
            <span className="absolute left-0 top-0 h-full w-2/5 animate-sheen bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent)]" />
            <span className="relative">{t("Start a project", "Начать проект")}</span>
          </Link>
          <Link
            href="#work"
            className="inline-flex items-center gap-2.5 rounded-xl border border-[rgba(140,180,240,.18)] bg-surface px-[26px] py-[15px] text-[15px] font-medium text-foreground backdrop-blur-md transition-colors hover:border-accent/50"
          >
            {t("See selected work", "Смотреть работы")} <span className="text-accent">↓</span>
          </Link>
        </div>

        <div className="flex flex-wrap gap-6">
          {[
            { c: "text-accent", en: "One point of contact", ru: "Один контакт на проект" },
            { c: "text-accent-purple", en: "Design → production", ru: "От макета до продакшена" },
            { c: "text-accent-blue", en: "Reply within a day", ru: "Ответ в течение суток" },
          ].map((p) => (
            <div key={p.en} className="flex items-center gap-2.5 text-[13px] text-muted-dim">
              <span className={`${p.c} text-base`}>◆</span>
              {t(p.en, p.ru)}
            </div>
          ))}
        </div>
      </div>

      {/* Ice cube: compact anchor below the copy on mobile, full-size column on desktop */}
      <div className="relative -mt-4 flex items-center justify-center lg:mt-0">
        <div
          className="pointer-events-none absolute select-none text-[clamp(90px,20vw,280px)] font-bold tracking-tighter text-[rgba(103,232,249,.05)]"
          style={{ filter: "url(#liquid)" }}
        >
          ice
        </div>
        <div
          className="relative h-[min(300px,74vw)] w-[min(300px,74vw)] scale-[.8] sm:scale-90 lg:h-[min(420px,78vw)] lg:w-[min(420px,78vw)] lg:scale-100"
          style={{ perspective: "1000px" }}
        >
          <div className="absolute inset-[14%] animate-glow-pulse rounded-full bg-[radial-gradient(circle,rgba(103,232,249,.4),rgba(154,19,232,.25)_45%,transparent_70%)] blur-[34px]" />
          <div className="absolute inset-0 animate-floaty">
            <div
              ref={tiltRef}
              className="absolute inset-0 transition-transform duration-200 ease-out"
              style={{ transform: "rotateX(-14deg) rotateY(0deg)", transformStyle: "preserve-3d" }}
            >
              <div
                className="absolute left-1/2 top-1/2 h-[200px] w-[200px] animate-spin3d"
                style={{ margin: "-100px 0 0 -100px", transformStyle: "preserve-3d" }}
              >
                <div style={face(
                  "translateZ(100px)",
                  "radial-gradient(circle at 30% 24%, rgba(255,255,255,.32), transparent 46%), linear-gradient(135deg, rgba(103,232,249,.16), rgba(168,85,247,.16))",
                  "inset 0 0 60px rgba(103,232,249,.2), inset 0 0 24px rgba(168,85,247,.15)"
                )} />
                <div style={face(
                  "rotateY(180deg) translateZ(100px)",
                  "radial-gradient(circle at 70% 30%, rgba(255,255,255,.24), transparent 46%), linear-gradient(135deg, rgba(56,189,248,.16), rgba(154,19,232,.16))",
                  "inset 0 0 60px rgba(103,232,249,.18)"
                )} />
                <div style={face(
                  "rotateY(90deg) translateZ(100px)",
                  "radial-gradient(circle at 40% 30%, rgba(255,255,255,.22), transparent 48%), linear-gradient(135deg, rgba(103,232,249,.13), rgba(168,85,247,.2))",
                  "inset 0 0 60px rgba(154,19,232,.18)"
                )} />
                <div style={face(
                  "rotateY(-90deg) translateZ(100px)",
                  "radial-gradient(circle at 60% 30%, rgba(255,255,255,.22), transparent 48%), linear-gradient(135deg, rgba(168,85,247,.16), rgba(56,189,248,.14))",
                  "inset 0 0 60px rgba(103,232,249,.16)"
                )} />
                <div style={face(
                  "rotateX(90deg) translateZ(100px)",
                  "radial-gradient(circle at 50% 40%, rgba(255,255,255,.42), transparent 52%), linear-gradient(135deg, rgba(103,232,249,.2), rgba(168,85,247,.14))",
                  "inset 0 0 60px rgba(103,232,249,.28)"
                )} />
                <div style={face(
                  "rotateX(-90deg) translateZ(100px)",
                  "linear-gradient(135deg, rgba(56,189,248,.12), rgba(154,19,232,.12))",
                  "inset 0 0 60px rgba(154,19,232,.14)"
                )} />
              </div>
            </div>
          </div>
          {/* Floating shards */}
          <div className="absolute right-[12%] top-[8%] h-[26px] w-[26px] animate-shard border border-[rgba(180,235,255,.5)] bg-[linear-gradient(135deg,rgba(103,232,249,.5),rgba(168,85,247,.4))]" />
          <div className="absolute bottom-[14%] left-[8%] h-[18px] w-[18px] animate-shard-reverse border border-[rgba(180,235,255,.5)] bg-[linear-gradient(135deg,rgba(56,189,248,.5),rgba(103,232,249,.4))]" />
          <div className="absolute right-[4%] top-[42%] h-3 w-3 animate-shard-fast border border-[rgba(200,180,255,.6)] bg-[rgba(168,85,247,.5)]" />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-[.18em] text-muted-ghost lg:flex">
        {t("scroll", "вниз")}
        <span className="h-[34px] w-px bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
}
