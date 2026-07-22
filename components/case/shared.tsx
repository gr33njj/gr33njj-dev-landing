"use client";

import Link from "next/link";

export function Sheen() {
  return (
    <span className="absolute left-0 top-0 h-full w-2/5 animate-sheen bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent)]" />
  );
}

export const primaryBtn =
  "relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-gradient-ice px-[26px] py-[15px] text-[15px] font-semibold text-[#04121a] shadow-[0_10px_34px_rgba(103,232,249,.3)] transition-transform hover:scale-[1.02]";

export const secondaryBtn =
  "inline-flex items-center gap-2.5 rounded-xl border border-[rgba(140,180,240,.18)] bg-surface px-[26px] py-[15px] text-[15px] font-medium text-foreground transition-colors hover:border-accent/50";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-[7px] font-mono text-xs tracking-wider text-[#9fe9ff]">
      <span className="h-[7px] w-[7px] rounded-full bg-accent-mint shadow-[0_0_10px_#34f5c5]" />
      {children}
    </div>
  );
}

export function Kicker({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 font-mono text-xs uppercase tracking-[.16em] text-accent">
      {n} — {children}
    </div>
  );
}

export function ProofBar({
  note,
  links,
}: {
  note: React.ReactNode;
  links: { href: string; label: string; gated?: boolean }[];
}) {
  return (
    <section className="relative border-y border-line bg-[#090b14] px-5 py-[22px] sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[900px] flex-wrap items-center justify-between gap-5">
        <p className="m-0 max-w-[460px] text-sm text-muted-dim">{note}</p>
        <div className="flex flex-wrap gap-2.5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(140,180,240,.18)] px-3.5 py-[9px] font-mono text-[12.5px] text-foreground transition-colors hover:border-accent/50 hover:text-accent"
            >
              {l.gated && <span className="text-muted-ghost">🔒</span>}
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BrowserFrame({
  url,
  src,
  alt,
  title,
  className,
}: {
  url: string;
  src: string;
  alt: string;
  title?: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-line shadow-[0_24px_80px_-24px_rgba(0,0,0,.55)] ${className ?? ""}`}
    >
      {title && (
        <div className="flex items-center gap-2 bg-[#0d0f17] px-3 pt-2.5">
          <div className="flex flex-none gap-1.5 pb-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="ml-1 flex max-w-[160px] items-center gap-2 truncate rounded-t-lg bg-[#1c1f2a] px-3 py-1.5 font-mono text-[11px] text-muted-faint">
            <span className="h-2.5 w-2.5 flex-none rounded-full bg-white/10" />
            <span className="truncate">{title}</span>
          </div>
        </div>
      )}
      <div className="flex items-center gap-3 bg-[#12141c] px-4 py-2.5">
        {!title && (
          <div className="flex flex-none gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
        )}
        <div className="flex flex-1 justify-center">
          <span className="rounded-full bg-[#1c1f2a] px-4 py-1 font-mono text-[11.5px] text-muted-faint">{url}</span>
        </div>
        {!title && <div className="w-[42px] flex-none" />}
      </div>
      <img src={src} alt={alt} loading="lazy" className="block w-full" />
    </div>
  );
}

export function PhoneFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[300px] overflow-hidden rounded-[42px] bg-black shadow-[0_30px_80px_-16px_rgba(0,0,0,.6)] ${className ?? ""}`}
    >
      <div className="absolute left-1/2 top-[10px] z-20 h-[24px] w-[104px] -translate-x-1/2 rounded-full bg-black" />
      <div className="flex flex-col pt-9">{children}</div>
    </div>
  );
}

export function TelegramHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-none items-center gap-3 border-b border-white/[0.06] bg-[#17212b] px-4 py-2.5">
      <svg width="11" height="19" viewBox="0 0 11 19" fill="none" className="flex-none">
        <path d="M9.5 1L1 9.5l8.5 8.5" stroke="#3390ec" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-full bg-[linear-gradient(135deg,#3390ec,#6f42d8)] text-[15px] font-bold text-white">
        T3
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[16px] font-semibold text-white">{title}</div>
        <div className="text-[12.5px] text-white/50">{subtitle}</div>
      </div>
    </div>
  );
}

export function CodeBlock({ children, label }: { children: string; label?: string }) {
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-line bg-[#0b0e18]">
      {label && (
        <div className="border-b border-line px-5 py-2.5 font-mono text-[11px] tracking-wide text-muted-faint">
          {label}
        </div>
      )}
      <pre className="overflow-x-auto p-5">
        <code className="font-mono text-[12.5px] leading-[1.7] text-[#c3d4f0]">{children}</code>
      </pre>
    </div>
  );
}

export function Quote({ children, cite }: { children: React.ReactNode; cite?: string }) {
  return (
    <blockquote className="my-8 border-l-2 border-accent/50 py-1 pl-6 text-[17px] italic leading-relaxed text-foreground">
      {children}
      {cite && <footer className="mt-2 font-mono text-[12px] not-italic text-muted-faint">— {cite}</footer>}
    </blockquote>
  );
}

export function StatGrid({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-[14px] sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="glass-card rounded-xl px-4 py-5 text-center">
          <div className="mb-1.5 font-mono text-[20px] font-semibold text-accent">{s.value}</div>
          <div className="text-[12px] leading-snug text-muted-dim">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export function FindingCard({
  tag,
  color,
  title,
  desc,
}: {
  tag: string;
  color: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-[#0b0e18] px-6 py-7">
      <span className="mb-3 block font-mono text-[11px]" style={{ color }}>
        {tag}
      </span>
      <h3 className="mb-2 text-[17px] font-semibold text-foreground">{title}</h3>
      <p className="m-0 text-sm leading-relaxed text-muted-dim">{desc}</p>
    </div>
  );
}

export function FindingGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-line bg-[rgba(140,180,240,.1)] md:grid-cols-3">
      {children}
    </div>
  );
}

export function DisclosureBox({
  title,
  tone,
  items,
}: {
  title: string;
  tone: "good" | "honest";
  items: string[];
}) {
  const color = tone === "good" ? "#34f5c5" : "#fbbf24";
  const mark = tone === "good" ? "✓" : "○";
  return (
    <div className="rounded-2xl border border-line bg-[rgba(140,180,240,.04)] p-6">
      <h4 className="mb-4 font-mono text-[12px] uppercase tracking-wide" style={{ color }}>
        {title}
      </h4>
      <ul className="m-0 flex flex-col gap-3 p-0">
        {items.map((it) => (
          <li key={it} className="flex list-none gap-2.5 text-sm leading-relaxed text-muted-dim">
            <span style={{ color }}>{mark}</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Steps({
  steps,
}: {
  steps: { title: string; desc: React.ReactNode }[];
}) {
  return (
    <div className="ml-2 border-l-2 border-[rgba(140,180,240,.14)]">
      {steps.map((s, i) => (
        <div key={s.title} className={`relative pl-8 ${i < steps.length - 1 ? "pb-8" : ""}`}>
          <div className="absolute -left-[19px] -top-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-ice font-mono text-[13px] font-bold text-[#04121a]">
            {i + 1}
          </div>
          <h3 className="mb-1.5 text-[16px] font-semibold text-foreground">{s.title}</h3>
          <div className="max-w-[640px] text-sm leading-relaxed text-muted-dim">{s.desc}</div>
        </div>
      ))}
    </div>
  );
}

export function CaseCTA({
  kicker,
  title,
  desc,
  primaryLabel,
  secondary,
}: {
  kicker: string;
  title: string;
  desc: string;
  primaryLabel: string;
  secondary: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#05060d_0%,#050810_100%)] px-5 py-[100px] text-center sm:px-10 lg:px-16">
      <div
        className="pointer-events-none absolute -top-[30%] left-1/2 h-[60vw] w-[60vw] -translate-x-1/2"
        style={{ background: "radial-gradient(circle, rgba(103,232,249,.14), transparent 62%)", filter: "blur(40px)" }}
      />
      <div className="relative">
        <div className="mb-[18px] font-mono text-xs uppercase tracking-[.16em] text-accent">{kicker}</div>
        <h2 className="mx-auto mb-[18px] max-w-[760px] text-[clamp(28px,4.4vw,46px)] font-bold leading-[1.1] tracking-tight">
          {title}
        </h2>
        <p className="mx-auto mb-[34px] max-w-[480px] leading-relaxed text-muted">{desc}</p>
        <div className="flex flex-wrap justify-center gap-3.5">
          <a href="https://t.me/gr33njj" target="_blank" rel="noopener noreferrer" className={primaryBtn}>
            <Sheen />
            <span className="relative">{primaryLabel}</span>
          </a>
          <Link href="/#work" className={secondaryBtn}>
            {secondary}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ArticleSection({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 px-5 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[760px]">{children}</div>
    </section>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-5 text-[16px] leading-[1.75] text-muted last:mb-0">{children}</p>;
}

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4 mt-2 text-[26px] font-bold leading-[1.2] tracking-tight text-foreground">{children}</h2>;
}

export function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mb-5 flex flex-col gap-2.5 pl-0">
      {items.map((it, i) => (
        <li key={i} className="flex list-none gap-3 text-[15.5px] leading-relaxed text-muted">
          <span className="mt-[3px] text-accent">◆</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
