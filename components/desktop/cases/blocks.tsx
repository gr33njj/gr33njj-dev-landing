"use client";

import { useLanguage } from "@/lib/i18n";

export const ACCENT = "#ef80ae";
export const ACCENT2 = "#3b6bff";

type Bi = { en: string; ru: string };

export type Block =
  | { type: "kicker"; n: string; en: string; ru: string }
  | { type: "h2"; en: string; ru: string }
  | { type: "p"; en: string; ru: string }
  | { type: "pnode"; en: React.ReactNode; ru: React.ReactNode }
  | { type: "quote"; en: string; ru: string }
  | { type: "list"; items: Bi[] }
  | { type: "code"; label?: string; code: string }
  | { type: "stats"; stats: { value: string; en: string; ru: string }[] }
  | { type: "image"; src: string; alt: Bi; caption?: Bi }
  | { type: "images"; items: { src: string; alt: Bi }[] }
  | { type: "video"; src: string; poster?: string; caption?: Bi }
  | { type: "findings"; items: { tag: Bi; title: Bi; desc: Bi }[] }
  | { type: "steps"; steps: { title: Bi; body: Block[] }[] }
  | { type: "disclosure"; good: { title: Bi; items: Bi[] }; honest: { title: Bi; items: Bi[] } }
  | { type: "caption"; en: string; ru: string }
  | { type: "spacer" };

export function CaseArticle({ blocks }: { blocks: Block[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} />
      ))}
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  const { lang, t } = useLanguage();
  const ru = lang === "ru";

  switch (block.type) {
    case "kicker":
      return (
        <div style={{ fontSize: 10, letterSpacing: ".18em", color: ACCENT, marginTop: 22, marginBottom: 4 }}>
          {block.n} — {t(block.en, block.ru)}
        </div>
      );
    case "h2":
      return (
        <h2 style={{ margin: "0 0 10px", fontSize: 17, fontWeight: 700, letterSpacing: ".01em", lineHeight: 1.3 }}>
          {t(block.en, block.ru)}
        </h2>
      );
    case "p":
      return (
        <p style={{ margin: "0 0 12px", fontSize: 12, lineHeight: 1.75, color: "rgba(255,255,255,.68)" }}>
          {t(block.en, block.ru)}
        </p>
      );
    case "pnode":
      return (
        <p style={{ margin: "0 0 12px", fontSize: 12, lineHeight: 1.75, color: "rgba(255,255,255,.68)" }}>
          {ru ? block.ru : block.en}
        </p>
      );
    case "quote":
      return (
        <blockquote
          style={{
            margin: "10px 0 16px",
            padding: "2px 0 2px 16px",
            borderLeft: `2px solid ${ACCENT}`,
            fontSize: 12.5,
            fontStyle: "italic",
            lineHeight: 1.7,
            color: "rgba(255,255,255,.82)",
          }}
        >
          {t(block.en, block.ru)}
        </blockquote>
      );
    case "list":
      return (
        <ul style={{ margin: "0 0 14px", padding: 0, display: "flex", flexDirection: "column", gap: 7 }}>
          {block.items.map((it, i) => (
            <li key={i} style={{ display: "flex", gap: 9, fontSize: 11.5, lineHeight: 1.65, color: "rgba(255,255,255,.65)", listStyle: "none" }}>
              <span style={{ color: ACCENT, flex: "0 0 auto" }}>◆</span>
              <span>{t(it.en, it.ru)}</span>
            </li>
          ))}
        </ul>
      );
    case "code":
      return (
        <div style={{ margin: "8px 0 16px", borderRadius: 9, border: "1px solid rgba(255,255,255,.1)", background: "#050506", overflow: "hidden" }}>
          {block.label && (
            <div style={{ padding: "7px 12px", borderBottom: "1px solid rgba(255,255,255,.08)", fontSize: 9.5, letterSpacing: ".06em", color: "rgba(255,255,255,.4)" }}>
              {block.label}
            </div>
          )}
          <pre style={{ margin: 0, padding: 14, overflowX: "auto" }}>
            <code style={{ fontSize: 11, lineHeight: 1.65, color: "rgba(255,255,255,.78)" }}>{block.code}</code>
          </pre>
        </div>
      );
    case "stats":
      return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 8, margin: "8px 0 16px" }}>
          {block.stats.map((s, i) => (
            <div key={i} style={{ padding: "12px 10px", borderRadius: 9, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.03)" }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: ACCENT, marginBottom: 2 }}>{s.value}</div>
              <div style={{ fontSize: 9.5, color: "rgba(255,255,255,.5)" }}>{t(s.en, s.ru)}</div>
            </div>
          ))}
        </div>
      );
    case "image":
      return (
        <figure style={{ margin: "10px 0 16px" }}>
          <img src={block.src} alt={t(block.alt.en, block.alt.ru)} style={{ display: "block", width: "100%", borderRadius: 10, border: "1px solid rgba(255,255,255,.1)" }} />
          {block.caption && (
            <figcaption style={{ marginTop: 8, textAlign: "center", fontSize: 10, color: "rgba(255,255,255,.4)" }}>
              {t(block.caption.en, block.caption.ru)}
            </figcaption>
          )}
        </figure>
      );
    case "video":
      return (
        <figure style={{ margin: "10px 0 16px" }}>
          <video
            src={block.src}
            poster={block.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{ display: "block", width: "100%", borderRadius: 10, border: "1px solid rgba(255,255,255,.1)" }}
          />
          {block.caption && (
            <figcaption style={{ marginTop: 8, textAlign: "center", fontSize: 10, color: "rgba(255,255,255,.4)" }}>
              {t(block.caption.en, block.caption.ru)}
            </figcaption>
          )}
        </figure>
      );
    case "images":
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${block.items.length >= 2 ? 2 : 1},1fr)`,
            gap: 10,
            margin: "10px 0 16px",
          }}
        >
          {block.items.map((im, i) => (
            <img key={i} src={im.src} alt={t(im.alt.en, im.alt.ru)} style={{ display: "block", width: "100%", borderRadius: 9, border: "1px solid rgba(255,255,255,.1)" }} />
          ))}
        </div>
      );
    case "findings":
      return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10, margin: "8px 0 16px" }}>
          {block.items.map((f, i) => (
            <div key={i} style={{ padding: 14, borderRadius: 9, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.025)" }}>
              <div style={{ fontSize: 9.5, color: ACCENT2, marginBottom: 8 }}>{t(f.tag.en, f.tag.ru)}</div>
              <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 6 }}>{t(f.title.en, f.title.ru)}</div>
              <div style={{ fontSize: 11, lineHeight: 1.6, color: "rgba(255,255,255,.58)" }}>{t(f.desc.en, f.desc.ru)}</div>
            </div>
          ))}
        </div>
      );
    case "steps":
      return (
        <div style={{ margin: "8px 0 16px", marginLeft: 4, borderLeft: "2px solid rgba(255,255,255,.1)" }}>
          {block.steps.map((s, i) => (
            <div key={i} style={{ position: "relative", paddingLeft: 22, paddingBottom: i < block.steps.length - 1 ? 18 : 0 }}>
              <div
                style={{
                  position: "absolute", left: -13, top: -1, width: 24, height: 24, borderRadius: "50%",
                  background: ACCENT, color: "#150a10", fontSize: 11, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                {i + 1}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{t(s.title.en, s.title.ru)}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {s.body.map((bb, j) => (
                  <BlockView key={j} block={bb} />
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    case "disclosure":
      return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10, margin: "8px 0 16px" }}>
          {[
            { data: block.good, color: "#34f5c5", mark: "✓" },
            { data: block.honest, color: "#fbbf24", mark: "○" },
          ].map((box, i) => (
            <div key={i} style={{ padding: 14, borderRadius: 9, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.025)" }}>
              <div style={{ fontSize: 9.5, letterSpacing: ".08em", color: box.color, marginBottom: 10, textTransform: "uppercase" }}>
                {t(box.data.title.en, box.data.title.ru)}
              </div>
              <ul style={{ margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {box.data.items.map((it, j) => (
                  <li key={j} style={{ display: "flex", gap: 7, fontSize: 11, lineHeight: 1.6, color: "rgba(255,255,255,.6)", listStyle: "none" }}>
                    <span style={{ color: box.color, flex: "0 0 auto" }}>{box.mark}</span>
                    <span>{t(it.en, it.ru)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case "caption":
      return (
        <p style={{ margin: "-8px 0 16px", textAlign: "center", fontSize: 10, color: "rgba(255,255,255,.4)" }}>
          {t(block.en, block.ru)}
        </p>
      );
    case "spacer":
      return <div style={{ height: 8 }} />;
  }
}
