"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import type { Post } from "@/lib/blog";
import { WindowChrome, WindowBody, rowLink } from "./WindowChrome";
import {
  PROJECTS, ARCHIVE, CATS, CASES, CASE_DETAILS, SOCIALS, APPROACH_STEPS, STACK_ITEMS, SAFARI_LINKS,
  SYSTEM_STATUS, DEV_INFO, NOTES_ENTRIES, TRASH_ENTRIES, DesktopProject,
  TOTAL_EXPERIENCE, EXPERIENCE, CERTIFICATES, RESUME_SKILLS,
} from "./data";
import { CaseArticle, type Block } from "./cases/blocks";
import { SKANGAR_BLOCKS } from "./cases/skangar";
import { MYDOCTOR_BLOCKS } from "./cases/mydoctor";
import { TRAD3_BLOCKS } from "./cases/trad3";
import { GAZON_BLOCKS } from "./cases/gazon";
import { MarkdownArticle } from "./MarkdownArticle";

const CASE_CONTENT: Record<string, Block[]> = {
  "skangar-landing": SKANGAR_BLOCKS,
  "mydoc-loyalty": MYDOCTOR_BLOCKS,
  TRAD3: TRAD3_BLOCKS,
  GAZON: GAZON_BLOCKS,
};

const accent = "#ef80ae";

/* ============================= WORKS / FINDER ============================= */

export function WorksWindow({
  onClose,
  hiddenShown,
  startCat,
  onOpenCase,
}: {
  onClose: () => void;
  hiddenShown: boolean;
  startCat?: string;
  onOpenCase: (id: string) => void;
}) {
  const { lang, t } = useLanguage();
  const ru = lang === "ru";
  const [cat, setCat] = useState(startCat || "all");

  const pool = cat === "archive" ? ARCHIVE : PROJECTS;
  const shown: DesktopProject[] = cat === "all" || cat === "archive" ? pool : pool.filter((p) => p.cat.includes(cat));

  return (
    <WindowChrome title={t("WORKS — FINDER", "РАБОТЫ — FINDER")} onClose={onClose}>
      <div className="gj-finder-body" style={{ flex: 1, display: "grid", gridTemplateColumns: "216px 1fr", minHeight: 0 }}>
        <aside
          className="gj-finder-sidebar"
          style={{
            borderRight: "1px solid rgba(255,255,255,.1)",
            padding: "16px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            background: "rgba(14,14,16,.7)",
            overflowY: "auto",
          }}
        >
          <div className="gj-finder-sidebar-hide" style={{ fontSize: 9, letterSpacing: ".24em", color: "rgba(255,255,255,.32)", padding: "6px 10px" }}>
            {t("FAVORITES", "ИЗБРАННОЕ")}
          </div>
          {CATS.map((c) => {
            const active = cat === c.id;
            const count = c.id === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.cat.includes(c.id)).length;
            return (
              <div
                key={c.id}
                className="gj-finder-item"
                onClick={() => setCat(c.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 10px",
                  borderRadius: 7,
                  fontSize: 11,
                  letterSpacing: ".08em",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  background: active ? "rgba(239,128,174,.16)" : "transparent",
                  color: active ? "#f5f5f5" : "rgba(255,255,255,.62)",
                }}
              >
                <span style={{ width: 14, textAlign: "center", color: accent }}>{c.glyph}</span>
                <span>{ru ? c.ru : c.en}</span>
                <span style={{ marginLeft: "auto", fontSize: 9, color: "rgba(255,255,255,.32)" }}>{count}</span>
              </div>
            );
          })}
          {hiddenShown && (
            <div
              className="gj-finder-item"
              onClick={() => setCat("archive")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 8,
                padding: "8px 10px",
                borderRadius: 7,
                fontSize: 11,
                letterSpacing: ".08em",
                cursor: "pointer",
                whiteSpace: "nowrap",
                color: "rgba(239,128,174,.8)",
                border: "1px dashed rgba(239,128,174,.45)",
              }}
            >
              <span style={{ width: 14, textAlign: "center" }}>◌</span>
              <span>.archive</span>
            </div>
          )}
        </aside>

        <main style={{ padding: "22px 24px", overflowY: "auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 18 }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, letterSpacing: ".08em" }}>
              {cat === "archive" ? ".archive" : t("Selected work", "Избранные работы")}
            </h2>
            <span style={{ fontSize: 10, letterSpacing: ".16em", color: "rgba(255,255,255,.42)" }}>
              {shown.length} {t("items", "шт.")}
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(300px,100%),1fr))", gap: 14 }}>
            {shown.map((p) => {
              const cardContent = (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 9, letterSpacing: ".18em", color: accent }}>{p.tag}</span>
                    <span style={{ marginLeft: "auto", fontSize: 12, color: "rgba(255,255,255,.4)" }}>↗</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: ".04em" }}>{p.id}</div>
                  <div style={{ fontSize: 11, lineHeight: 1.75, color: "rgba(255,255,255,.62)" }}>{ru ? p.ru.desc : p.en.desc}</div>
                  <div style={{ fontSize: 10, lineHeight: 1.7, color: "rgba(255,255,255,.42)", borderTop: "1px solid rgba(255,255,255,.1)", paddingTop: 9 }}>
                    {ru ? p.ru.result : p.en.result}
                  </div>
                  <div style={{ fontSize: 9, letterSpacing: ".12em", color: "rgba(255,255,255,.34)" }}>{p.stack}</div>
                </>
              );
              return p.isCase ? (
                <button key={p.id} type="button" onClick={() => onOpenCase(p.id)} style={{ ...rowLink, textAlign: "left", cursor: "pointer", font: "inherit" }}>
                  {cardContent}
                </button>
              ) : (
                <a key={p.id} href={p.link} target="_blank" rel="noopener" style={rowLink}>
                  {cardContent}
                </a>
              );
            })}
          </div>
          <div style={{ marginTop: 20, fontSize: 9, letterSpacing: ".14em", color: "rgba(255,255,255,.24)" }}>
            {cat === "archive"
              ? t("Hidden folder. ⌘⇧. to hide it again.", "Скрытая папка. ⌘⇧. — спрятать обратно.")
              : t("⌘⇧. — show hidden files", "⌘⇧. — показать скрытые файлы")}
          </div>
        </main>
      </div>
    </WindowChrome>
  );
}

/* ============================= CASES ============================= */

export function CasesWindow({ onClose, onOpenCase }: { onClose: () => void; onOpenCase: (id: string) => void }) {
  const { lang, t } = useLanguage();
  const ru = lang === "ru";

  return (
    <WindowChrome title={t("CASE STUDIES", "ПОДРОБНЫЕ КЕЙСЫ")} onClose={onClose} width="min(760px,90vw)" height="min(560px,84vh)">
      <WindowBody>
        <p style={{ margin: "0 0 20px", fontSize: 11, lineHeight: 1.7, color: "rgba(255,255,255,.58)" }}>
          {t(
            "Four write-ups with real numbers, screenshots and honest disclaimers — not portfolio copy.",
            "Четыре разбора с реальными цифрами, скриншотами и честными оговорками — не портфолио-копирайт."
          )}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(300px,100%),1fr))", gap: 14 }}>
          {CASES.map((p) => (
            <button key={p.id} type="button" onClick={() => onOpenCase(p.id)} style={{ ...rowLink, textAlign: "left", cursor: "pointer", font: "inherit" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 9, letterSpacing: ".18em", color: accent }}>{p.tag}</span>
                <span style={{ marginLeft: "auto", fontSize: 12, color: "rgba(255,255,255,.4)" }}>↗</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: ".04em" }}>{p.id}</div>
              <div style={{ fontSize: 11, lineHeight: 1.75, color: "rgba(255,255,255,.62)" }}>{ru ? p.ru.desc : p.en.desc}</div>
              <div style={{ fontSize: 10, lineHeight: 1.7, color: "rgba(255,255,255,.42)", borderTop: "1px solid rgba(255,255,255,.1)", paddingTop: 9 }}>
                {ru ? p.ru.result : p.en.result}
              </div>
            </button>
          ))}
        </div>
      </WindowBody>
    </WindowChrome>
  );
}

/* ============================= CASE DETAIL ============================= */

export function CaseDetailWindow({
  caseId,
  onClose,
}: {
  caseId: string;
  onClose: () => void;
}) {
  const { lang } = useLanguage();
  const ru = lang === "ru";
  const detail = CASE_DETAILS.find((c) => c.id === caseId);
  if (!detail) return null;

  return (
    <WindowChrome title={detail.id} onClose={onClose} width="min(720px,92vw)" height="min(660px,88vh)">
      <WindowBody>
        <img
          src={detail.image}
          alt={detail.id}
          style={{ width: "100%", display: "block", borderRadius: 10, border: "1px solid rgba(255,255,255,.12)", marginBottom: 18 }}
        />
        <div style={{ fontSize: 9, letterSpacing: ".18em", color: accent, marginBottom: 8 }}>{detail.tag}</div>
        <h2 style={{ margin: "0 0 12px", fontSize: 18, fontWeight: 700, letterSpacing: ".02em" }}>{detail.id}</h2>
        <p style={{ margin: "0 0 20px", fontSize: 12, lineHeight: 1.75, color: "rgba(255,255,255,.68)" }}>
          {ru ? detail.ru : detail.en}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginBottom: 20 }}>
          {detail.stats.map((s) => (
            <div key={s.en} style={{ padding: "12px 14px", borderRadius: 9, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.03)" }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: accent, marginBottom: 2 }}>{s.value}</div>
              <div style={{ fontSize: 9.5, color: "rgba(255,255,255,.5)" }}>{ru ? s.ru : s.en}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 9.5, letterSpacing: ".04em", color: "rgba(255,255,255,.4)", marginBottom: 22 }}>{detail.stack}</div>
        <div style={{ height: 1, background: "rgba(255,255,255,.1)", margin: "4px 0 6px" }} />
        {CASE_CONTENT[detail.id] && <CaseArticle blocks={CASE_CONTENT[detail.id]} />}
      </WindowBody>
    </WindowChrome>
  );
}

/* ============================= BLOG ============================= */

export function BlogWindow({ onClose, onOpenPost }: { onClose: () => void; onOpenPost: (slug: string) => void }) {
  const { lang, t } = useLanguage();
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts))
      .catch(() => setPosts([]));
  }, []);

  const filtered = (posts || []).filter((p) => p.lang === lang);

  return (
    <WindowChrome title={t("BLOG", "БЛОГ")} onClose={onClose} width="min(760px,90vw)" height="min(600px,84vh)">
      <WindowBody>
        {posts === null && (
          <p style={{ fontSize: 11, color: "rgba(255,255,255,.42)" }}>{t("Loading…", "Загрузка…")}</p>
        )}
        {posts !== null && filtered.length === 0 && (
          <p style={{ fontSize: 11, color: "rgba(255,255,255,.42)" }}>{t("No posts yet.", "Постов пока нет.")}</p>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((post) => (
            <button
              key={post.slug}
              type="button"
              onClick={() => onOpenPost(post.slug)}
              style={{ ...rowLink, textAlign: "left", cursor: "pointer", font: "inherit", width: "100%" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                {post.tags.slice(0, 2).map((tag) => (
                  <span key={tag} style={{ fontSize: 9, letterSpacing: ".14em", color: accent }}>
                    {tag.toUpperCase()}
                  </span>
                ))}
                <span style={{ marginLeft: "auto", fontSize: 10, color: "rgba(255,255,255,.4)" }}>{post.date}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{post.title}</div>
              <div style={{ fontSize: 11, lineHeight: 1.7, color: "rgba(255,255,255,.62)" }}>{post.excerpt}</div>
            </button>
          ))}
        </div>
      </WindowBody>
    </WindowChrome>
  );
}

/* ============================= BLOG POST DETAIL ============================= */

export function BlogPostWindow({ slug, onClose }: { slug: string; onClose: () => void }) {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts))
      .catch(() => setPosts([]));
  }, []);

  const post = (posts || []).find((p) => p.slug === slug);

  return (
    <WindowChrome title={post ? post.title : t("POST", "ПОСТ")} onClose={onClose} width="min(720px,92vw)" height="min(680px,88vh)">
      <WindowBody>
        {posts === null && <p style={{ fontSize: 11, color: "rgba(255,255,255,.42)" }}>{t("Loading…", "Загрузка…")}</p>}
        {posts !== null && !post && <p style={{ fontSize: 11, color: "rgba(255,255,255,.42)" }}>{t("Post not found.", "Пост не найден.")}</p>}
        {post && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
              {post.tags.map((tag) => (
                <span key={tag} style={{ fontSize: 9, letterSpacing: ".14em", color: accent }}>
                  {tag.toUpperCase()}
                </span>
              ))}
              <span style={{ marginLeft: "auto", fontSize: 10, color: "rgba(255,255,255,.4)" }}>{post.date}</span>
            </div>
            <h2 style={{ margin: "0 0 16px", fontSize: 20, fontWeight: 700, letterSpacing: "-.01em", lineHeight: 1.25 }}>{post.title}</h2>
            <MarkdownArticle source={post.content} />
          </>
        )}
      </WindowBody>
    </WindowChrome>
  );
}

/* ============================= ABOUT ============================= */

export function AboutWindow({ onClose }: { onClose: () => void }) {
  const { lang, t } = useLanguage();
  const ru = lang === "ru";

  return (
    <WindowChrome title={t("ABOUT", "ОБО МНЕ")} onClose={onClose} width="min(760px,90vw)" height="min(660px,86vh)">
      <WindowBody>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#ef80ae,#9e3d69)",
              display: "grid",
              placeItems: "center",
              fontWeight: 700,
              fontSize: 15,
              flex: "0 0 auto",
            }}
          >
            33
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: ".04em" }}>gr33njj</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>
              {t("Fullstack Engineer · ", "Fullstack-разработчик · ")}{ru ? TOTAL_EXPERIENCE.ru : TOTAL_EXPERIENCE.en}
            </div>
          </div>
        </div>
        <p style={{ margin: "0 0 24px", fontSize: 12, lineHeight: 1.75, color: "rgba(255,255,255,.7)" }}>
          {t(
            "I turn raw ideas into products that look expensive and ship on time. Frontend, backend, architecture, design — handled end to end, without a five-person team.",
            "Превращаю сырые идеи в продукты, которые выглядят дорого и выходят в срок. Фронтенд, бэкенд, архитектура, дизайн — под ключ, без команды из пяти человек."
          )}
        </p>

        <div style={{ marginBottom: 8, fontSize: 10, letterSpacing: ".18em", color: accent }}>
          {t("EXPERIENCE", "ОПЫТ РАБОТЫ")}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 26 }}>
          {EXPERIENCE.map((job) => (
            <div key={job.domain} style={{ borderLeft: "2px solid rgba(255,255,255,.1)", paddingLeft: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{job.domain}</div>
              <div style={{ fontSize: 10.5, color: "rgba(255,255,255,.5)", marginBottom: 2 }}>
                {ru ? job.role.ru : job.role.en} · {ru ? job.period.ru : job.period.en}
              </div>
              <div style={{ fontSize: 9.5, letterSpacing: ".04em", color: "rgba(239,128,174,.7)", marginBottom: 8 }}>{job.stack}</div>
              <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 5 }}>
                {(ru ? job.bullets.ru : job.bullets.en).map((b, i) => (
                  <li key={i} style={{ fontSize: 11, lineHeight: 1.6, color: "rgba(255,255,255,.6)" }}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 8, fontSize: 10, letterSpacing: ".18em", color: accent }}>
          {t("CERTIFICATES", "СЕРТИФИКАТЫ")}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 26 }}>
          {CERTIFICATES.map((c) => (
            <a
              key={c.name}
              href={c.link}
              target="_blank"
              rel="noopener"
              className="gj-cert-link"
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
                padding: "5px 6px", margin: "0 -6px", borderRadius: 6,
                fontSize: 11, color: "rgba(255,255,255,.65)", textDecoration: "none",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {c.name}
                <span style={{ fontSize: 9.5, color: accent }}>↗</span>
              </span>
              <span style={{ color: "rgba(255,255,255,.35)", flex: "0 0 auto" }}>{c.year}</span>
            </a>
          ))}
        </div>

        <div style={{ marginBottom: 10, fontSize: 10, letterSpacing: ".18em", color: accent }}>
          {t("SKILLS", "НАВЫКИ")}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {RESUME_SKILLS.map((s) => (
            <span
              key={s}
              style={{
                padding: "5px 10px",
                borderRadius: 7,
                border: "1px solid rgba(255,255,255,.14)",
                background: "rgba(255,255,255,.03)",
                fontSize: 10.5,
                color: "rgba(255,255,255,.72)",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </WindowBody>
    </WindowChrome>
  );
}

/* ============================= PROCESS / APPROACH ============================= */

export function ProcessWindow({ onClose }: { onClose: () => void }) {
  const { lang, t } = useLanguage();
  const ru = lang === "ru";

  return (
    <WindowChrome title={t("APPROACH", "ПОДХОД")} onClose={onClose} width="min(760px,90vw)" height="min(600px,84vh)">
      <WindowBody>
        <p style={{ margin: "0 0 20px", fontSize: 12, lineHeight: 1.75, color: "rgba(255,255,255,.7)" }}>
          {t(
            "You do not need to understand the tech. You need someone who owns the result, speaks plainly, and shows working things — not slides full of promises.",
            "Вам не нужно разбираться в технологиях. Вам нужен тот, кто отвечает за результат, говорит по-человечески и показывает работающие вещи, а не слайды с обещаниями."
          )}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {APPROACH_STEPS.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 14, padding: 16, borderRadius: 10, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.03)" }}>
              <div style={{ fontSize: 11, color: accent, flex: "0 0 auto" }}>{String(i + 1).padStart(2, "0")}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{ru ? s.ru.title : s.en.title}</div>
                <div style={{ fontSize: 11, lineHeight: 1.6, color: "rgba(255,255,255,.56)" }}>{ru ? s.ru.desc : s.en.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </WindowBody>
    </WindowChrome>
  );
}

/* ============================= STACK ============================= */

export function StackWindow({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();

  return (
    <WindowChrome title={t("STACK", "СТЕК")} onClose={onClose} width="min(560px,90vw)" height="min(420px,70vh)">
      <WindowBody>
        <p style={{ margin: "0 0 18px", fontSize: 11, lineHeight: 1.7, color: "rgba(255,255,255,.58)" }}>
          {t("Tools I reach for.", "Чем работаю.")}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {STACK_ITEMS.map((item) => (
            <span
              key={item}
              style={{
                padding: "8px 13px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,.14)",
                background: "rgba(255,255,255,.04)",
                fontSize: 11,
                letterSpacing: ".04em",
                color: "rgba(255,255,255,.78)",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </WindowBody>
    </WindowChrome>
  );
}

/* ============================= SAFARI ============================= */

export function SafariWindow({ onClose }: { onClose: () => void }) {
  const { lang } = useLanguage();
  const ru = lang === "ru";

  return (
    <WindowChrome title="SAFARI" onClose={onClose} width="min(560px,90vw)" height="min(360px,66vh)">
      <WindowBody>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {SAFARI_LINKS.map((l) => (
            <a key={l.host} href={`https://${l.host}`} target="_blank" rel="noopener" style={rowLink}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".02em" }}>{l.host}</span>
                <span style={{ marginLeft: "auto", fontSize: 12, color: "rgba(255,255,255,.4)" }}>↗</span>
              </div>
              <div style={{ fontSize: 11, lineHeight: 1.6, color: "rgba(255,255,255,.6)" }}>{ru ? l.ru : l.en}</div>
            </a>
          ))}
        </div>
      </WindowBody>
    </WindowChrome>
  );
}

/* ============================= CONTACTS ============================= */

export function ContactsWindow({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const inputStyle: React.CSSProperties = {
    padding: "11px 13px", borderRadius: 9, border: "1px solid rgba(255,255,255,.14)",
    background: "rgba(255,255,255,.04)", color: "#f5f5f5", fontSize: 12, fontFamily: "inherit", outline: "none",
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <WindowChrome title={t("CONTACTS", "КОНТАКТЫ")} onClose={onClose} width="min(560px,90vw)" height="min(660px,86vh)">
      <WindowBody>
        <p style={{ margin: "0 0 20px", fontSize: 12, lineHeight: 1.75, color: "rgba(255,255,255,.7)" }}>
          {t(
            "Tell me the task in two lines and I will come back with a plan, a price and a timeline.",
            "Опишите задачу в двух строках — вернусь с планом, ценой и сроком."
          )}
        </p>
        <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid rgba(255,255,255,.1)", marginBottom: 22 }}>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener"
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 14,
                padding: "13px 4px",
                borderBottom: "1px solid rgba(255,255,255,.08)",
                color: "#f5f5f5",
                textDecoration: "none",
                fontSize: 12,
              }}
            >
              <span style={{ letterSpacing: ".1em", color: "rgba(255,255,255,.5)" }}>{s.label}</span>
              <span>{s.value}</span>
            </a>
          ))}
        </div>

        <div style={{ fontSize: 9.5, letterSpacing: ".14em", color: "rgba(255,255,255,.4)", marginBottom: 12 }}>
          {t("OR USE THE CONTACT FORM", "ИЛИ ФОРМА ОБРАТНОЙ СВЯЗИ")}
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <input name="name" required placeholder={t("Your name", "Ваше имя")} style={inputStyle} />
          <input name="email" type="email" required placeholder={t("Email", "Email")} style={inputStyle} />
          <textarea name="message" rows={4} required placeholder={t("What are you building?", "Что вы строите?")} style={{ ...inputStyle, resize: "none" }} />
          <button
            type="submit"
            disabled={status === "sending"}
            style={{
              padding: "12px 16px", borderRadius: 9, border: "none", background: accent, color: "#150a10",
              fontSize: 12, fontWeight: 700, letterSpacing: ".04em", fontFamily: "inherit", cursor: "pointer",
              opacity: status === "sending" ? 0.6 : 1,
            }}
          >
            {status === "sending" ? "…" : t("Send it →", "Отправить →")}
          </button>
          {status === "success" && (
            <p style={{ margin: 0, fontSize: 11, color: "#34f5c5" }}>{t("Sent! I'll reply within a day.", "Отправлено! Отвечу в течение суток.")}</p>
          )}
          {status === "error" && (
            <p style={{ margin: 0, fontSize: 11, color: "#ff6b6b" }}>{t("Something broke — write me directly.", "Что-то сломалось — напишите мне напрямую.")}</p>
          )}
        </form>
      </WindowBody>
    </WindowChrome>
  );
}

/* ============================= SYSTEM STATUS ============================= */

export function StatusWindow({ onClose }: { onClose: () => void }) {
  const { lang, t } = useLanguage();
  const ru = lang === "ru";
  const online = SYSTEM_STATUS.filter((s) => s.ok).length;

  return (
    <WindowChrome title={t("SYSTEM STATUS", "СТАТУС СИСТЕМЫ")} onClose={onClose} width="min(560px,90vw)" height="min(560px,82vh)">
      <WindowBody>
        <p style={{ margin: "0 0 18px", fontSize: 11, lineHeight: 1.7, color: "rgba(255,255,255,.58)" }}>
          {t(
            `${online}/${SYSTEM_STATUS.length} subsystems online. Checked by hand, not by a live monitor — yet.`,
            `${online}/${SYSTEM_STATUS.length} подсистем в норме. Проверено руками, не живым монитором — пока.`
          )}
        </p>
        <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid rgba(255,255,255,.1)" }}>
          {SYSTEM_STATUS.map((s) => (
            <div key={s.en} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "10px 2px", borderBottom: "1px solid rgba(255,255,255,.08)", fontSize: 11.5 }}>
              <span style={{ color: "rgba(255,255,255,.8)" }}>{ru ? s.ru : s.en}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6, color: s.ok ? "#28c840" : "rgba(255,255,255,.34)", fontSize: 10, letterSpacing: ".08em", flexShrink: 0 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.ok ? "#28c840" : "rgba(255,255,255,.3)" }} />
                {s.ok ? t("ONLINE", "РАБОТАЕТ") : t("PLANNED", "В ПЛАНАХ")}
              </span>
            </div>
          ))}
        </div>
      </WindowBody>
    </WindowChrome>
  );
}

/* ============================= DEVELOPER MODE ============================= */

export function DevModeWindow({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();

  return (
    <WindowChrome title={t("DEVELOPER MODE", "РЕЖИМ РАЗРАБОТЧИКА")} onClose={onClose} width="min(560px,90vw)" height="min(480px,78vh)">
      <WindowBody>
        <p style={{ margin: "0 0 18px", fontSize: 11, lineHeight: 1.7, color: "rgba(255,255,255,.58)" }}>
          {t("What this page is actually built from.", "Из чего на самом деле собрана эта страница.")}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 1, fontFamily: "inherit" }}>
          {DEV_INFO.map((row) => (
            <div key={row.k} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 14, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
              <span style={{ fontSize: 10.5, letterSpacing: ".08em", color: accent }}>{row.k}</span>
              <span style={{ fontSize: 11.5, color: "rgba(255,255,255,.78)" }}>{row.v}</span>
            </div>
          ))}
        </div>
      </WindowBody>
    </WindowChrome>
  );
}

/* ============================= NOTES ============================= */

export function NotesWindow({ onClose }: { onClose: () => void }) {
  const { lang, t } = useLanguage();
  const ru = lang === "ru";

  return (
    <WindowChrome title={t("NOTES", "ЗАМЕТКИ")} onClose={onClose} width="min(560px,90vw)" height="min(460px,76vh)">
      <WindowBody>
        <p style={{ margin: "0 0 18px", fontSize: 11, lineHeight: 1.7, color: "rgba(255,255,255,.58)" }}>
          {t("A short build log, not a diary.", "Короткий build-log, не дневник.")}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {NOTES_ENTRIES.map((n, i) => (
            <div key={i} style={{ padding: 14, borderRadius: 10, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.03)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 5 }}>{ru ? n.ru.title : n.en.title}</div>
              <div style={{ fontSize: 11, lineHeight: 1.6, color: "rgba(255,255,255,.58)" }}>{ru ? n.ru.body : n.en.body}</div>
            </div>
          ))}
        </div>
      </WindowBody>
    </WindowChrome>
  );
}

/* ============================= TRASH ============================= */

export function TrashWindow({ onClose }: { onClose: () => void }) {
  const { lang, t } = useLanguage();
  const ru = lang === "ru";

  return (
    <WindowChrome title={t("TRASH", "КОРЗИНА")} onClose={onClose} width="min(560px,90vw)" height="min(420px,72vh)">
      <WindowBody>
        <p style={{ margin: "0 0 18px", fontSize: 11, lineHeight: 1.7, color: "rgba(255,255,255,.58)" }}>
          {t("Retired ideas, kept for the story.", "Списанные идеи, оставленные ради истории.")}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {TRASH_ENTRIES.map((n, i) => (
            <div key={i} style={{ padding: 14, borderRadius: 10, border: "1px dashed rgba(255,255,255,.16)", opacity: 0.82 }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 5, textDecoration: "line-through", textDecorationColor: "rgba(255,255,255,.3)" }}>
                {ru ? n.ru.title : n.en.title}
              </div>
              <div style={{ fontSize: 11, lineHeight: 1.6, color: "rgba(255,255,255,.5)" }}>{ru ? n.ru.body : n.en.body}</div>
            </div>
          ))}
        </div>
      </WindowBody>
    </WindowChrome>
  );
}

/* ============================= PRIVACY / TERMS ============================= */

export function PrivacyWindow({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  return (
    <WindowChrome title={t("PRIVACY POLICY", "ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ")} onClose={onClose} width="min(560px,90vw)" height="min(480px,78vh)">
      <WindowBody>
        <div style={{ fontSize: 11.5, lineHeight: 1.8, color: "rgba(255,255,255,.7)", display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ margin: 0 }}>
            {t(
              "The contact form sends your name, email and message straight to my inbox by email. Nothing is written to a database, sold, or shared with a third party.",
              "Форма контактов отправляет ваши имя, email и сообщение мне на почту письмом. Ничего не пишется в базу данных, не продаётся и не передаётся третьим лицам."
            )}
          </p>
          <p style={{ margin: 0 }}>
            {t(
              "This site sets no tracking cookies and runs no third-party analytics.",
              "Сайт не ставит трекинг-куки и не использует сторонней аналитики."
            )}
          </p>
        </div>
      </WindowBody>
    </WindowChrome>
  );
}

export function TermsWindow({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  return (
    <WindowChrome title={t("TERMS OF SERVICE", "УСЛОВИЯ ИСПОЛЬЗОВАНИЯ")} onClose={onClose} width="min(560px,90vw)" height="min(420px,72vh)">
      <WindowBody>
        <div style={{ fontSize: 11.5, lineHeight: 1.8, color: "rgba(255,255,255,.7)", display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ margin: 0 }}>
            {t(
              "This site is a personal portfolio. Case study numbers and screenshots are real; project descriptions reflect my own work.",
              "Этот сайт — личное портфолио. Цифры и скриншоты в кейсах реальные, описания проектов отражают мою собственную работу."
            )}
          </p>
          <p style={{ margin: 0 }}>
            {t(
              "External links (GitHub, live demos) lead to third-party or separately hosted services I don't control end to end.",
              "Внешние ссылки (GitHub, живые демо) ведут на сторонние или отдельно размещённые сервисы, которые я не полностью контролирую."
            )}
          </p>
        </div>
      </WindowBody>
    </WindowChrome>
  );
}

/* ============================= TERMINAL ============================= */

type TerminalLine = { kind: "cmd" | "out"; text: string };

export function TerminalWindow({
  onClose,
  onOpenWindow,
}: {
  onClose: () => void;
  onOpenWindow: (key: "about" | "works" | "process" | "contact" | "cases" | "blog" | "stack" | "status") => void;
}) {
  const { lang, t } = useLanguage();
  const ru = lang === "ru";
  const [lines, setLines] = useState<TerminalLine[]>([
    { kind: "out", text: ru ? "gr33njj OS [terminal preview]. Наберите 'help'." : "gr33njj OS [terminal preview]. Type 'help'." },
  ]);
  const [value, setValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  function push(...out: string[]) {
    setLines((cur) => [...cur, ...out.map((text) => ({ kind: "out" as const, text }))]);
  }

  function run(raw: string) {
    const cmd = raw.trim();
    setLines((cur) => [...cur, { kind: "cmd", text: cmd }]);
    if (!cmd) return;
    const [name, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(" ");

    switch (name.toLowerCase()) {
      case "help":
        push(
          "help, whoami, about, ls, open <project>, contact, github, blog, cases, stack, status, date, clear, exit"
        );
        break;
      case "whoami":
        push(ru ? "gr33njj — инженер-мультитул. Frontend, backend, архитектура, дизайн." : "gr33njj — multitool engineer. Frontend, backend, architecture, design.");
        break;
      case "about":
        push(ru ? "открываю About…" : "opening About…");
        onOpenWindow("about");
        break;
      case "ls":
      case "works":
        PROJECTS.forEach((p) => push(`${p.id.padEnd(20)} ${p.tag}`));
        push(ru ? "→ open <project> чтобы открыть" : "→ open <project> to view");
        break;
      case "open": {
        const proj = PROJECTS.find((p) => p.id.toLowerCase() === arg.toLowerCase());
        if (proj) {
          push(`${ru ? "открываю" : "opening"} ${proj.id}…`);
          window.open(proj.link, "_blank", "noopener");
        } else {
          push(ru ? `не найдено: ${arg}. попробуйте 'ls'` : `not found: ${arg}. try 'ls'`);
        }
        break;
      }
      case "contact":
        push(ru ? "открываю Contacts…" : "opening Contacts…");
        onOpenWindow("contact");
        break;
      case "github":
        push("opening github.com/gr33njj…");
        window.open("https://github.com/gr33njj", "_blank", "noopener");
        break;
      case "blog":
        push(ru ? "открываю Blog…" : "opening Blog…");
        onOpenWindow("blog");
        break;
      case "cases":
        push(ru ? "открываю Cases…" : "opening Cases…");
        onOpenWindow("cases");
        break;
      case "stack":
        push(ru ? "открываю Stack…" : "opening Stack…");
        onOpenWindow("stack");
        break;
      case "status":
        push(ru ? "открываю System Status…" : "opening System Status…");
        onOpenWindow("status");
        break;
      case "date":
        push(new Date().toString());
        break;
      case "clear":
        setLines([]);
        break;
      case "exit":
        onClose();
        break;
      case "sudo":
        if (arg.toLowerCase().includes("make-coffee") || arg.toLowerCase().includes("make-me-a-coffee")) {
          push("gr33njj is not in the sudoers file. This incident will be reported. ☕");
        } else {
          push(ru ? "permission denied" : "permission denied");
        }
        break;
      default:
        push(ru ? `команда не найдена: ${name}. наберите 'help'` : `command not found: ${name}. type 'help'`);
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  return (
    <WindowChrome title={t("TERMINAL", "ТЕРМИНАЛ")} onClose={onClose} width="min(640px,92vw)" height="min(440px,76vh)">
      <div
        ref={scrollRef}
        onClick={(e) => (e.currentTarget.querySelector("input") as HTMLInputElement | null)?.focus()}
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          padding: "16px 18px",
          background: "#050505",
          fontSize: 12,
          lineHeight: 1.7,
        }}
      >
        {lines.map((l, i) =>
          l.kind === "cmd" ? (
            <div key={i} style={{ color: "#f5f5f5" }}>
              <span style={{ color: accent }}>❯ </span>
              {l.text}
            </div>
          ) : (
            <div key={i} style={{ color: "rgba(255,255,255,.62)", whiteSpace: "pre-wrap" }}>
              {l.text}
            </div>
          )
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
          <span style={{ color: accent }}>❯</span>
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                run(value);
                setValue("");
              }
            }}
            spellCheck={false}
            style={{
              flex: 1,
              background: "transparent",
              border: 0,
              outline: "none",
              color: "#f5f5f5",
              fontFamily: "inherit",
              fontSize: 12,
            }}
          />
        </div>
      </div>
    </WindowChrome>
  );
}
