"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { PROJECTS } from "./data";
import { WindowInstance } from "./WindowChrome";
import { SlotsWindow } from "./SlotsWindow";
import {
  WorksWindow,
  CasesWindow,
  CaseDetailWindow,
  BlogWindow,
  BlogPostWindow,
  AboutWindow,
  ProcessWindow,
  ContactsWindow,
  StackWindow,
  SafariWindow,
  TerminalWindow,
  DevModeWindow,
  StatusWindow,
  NotesWindow,
  TrashWindow,
  PrivacyWindow,
  TermsWindow,
} from "./Windows";

type WindowKey =
  | "about" | "works" | "process" | "contact" | "cases" | "blog" | "stack" | "safari"
  | "terminal" | "devmode" | "status" | "notes" | "trash" | "privacy" | "terms" | "casedetail" | "postdetail" | "slots";
type IconKey = "about" | "works" | "process" | "contact" | "cases" | "blog" | "stack" | "status";

type OpenWin = { id: string; key: WindowKey; subId?: string; x: number; y: number; z: number; minimized: boolean; maximized: boolean };

const WINDOW_TITLES: Record<WindowKey, [string, string]> = {
  about: ["About", "Обо мне"],
  works: ["Works", "Работы"],
  process: ["Approach", "Подход"],
  contact: ["Contacts", "Контакты"],
  cases: ["Cases", "Кейсы"],
  blog: ["Blog", "Блог"],
  stack: ["Stack", "Стек"],
  safari: ["Safari", "Safari"],
  terminal: ["Terminal", "Терминал"],
  devmode: ["Developer Mode", "Режим разработчика"],
  status: ["Status", "Статус"],
  notes: ["Notes", "Заметки"],
  trash: ["Trash", "Корзина"],
  privacy: ["Privacy", "Приватность"],
  terms: ["Terms", "Условия"],
  slots: ["Slots", "Слоты"],
  casedetail: ["Case", "Кейс"],
  postdetail: ["Post", "Пост"],
};

function useIsDesktop() {
  // computed synchronously where possible instead of always defaulting to true — this
  // component only ever mounts client-side (force-dynamic page, "use client" root), so
  // `window` is available by the time this initializer runs.
  const [isDesktop, setIsDesktop] = useState(() => (typeof window === "undefined" ? true : window.matchMedia("(min-width: 681px)").matches));
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 681px)");
    setIsDesktop(mq.matches);
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

const ACCENT = "#ef80ae";

const ICONS: { key: IconKey; glyph: string; label: string; labelRu: string; delay: string }[] = [
  { key: "about", glyph: "◉", label: "ABOUT", labelRu: "ОБО МНЕ", delay: ".1s" },
  { key: "works", glyph: "▣", label: "WORKS", labelRu: "РАБОТЫ", delay: ".2s" },
  { key: "process", glyph: "≡", label: "PROCESS", labelRu: "ПОДХОД", delay: ".3s" },
  { key: "contact", glyph: "✉", label: "CONTACTS", labelRu: "КОНТАКТЫ", delay: ".4s" },
  { key: "cases", glyph: "◫", label: "CASES", labelRu: "КЕЙСЫ", delay: ".45s" },
  { key: "blog", glyph: "✒", label: "BLOG", labelRu: "БЛОГ", delay: ".5s" },
  { key: "stack", glyph: "⌘", label: "STACK", labelRu: "СТЕК", delay: ".55s" },
  { key: "status", glyph: "◈", label: "STATUS", labelRu: "СТАТУС", delay: ".6s" },
];

export default function GDesktop() {
  const { lang, setLanguage, t } = useLanguage();
  const ru = lang === "ru";

  const [clock, setClock] = useState("--:--");
  const [menu, setMenu] = useState<{ open: boolean; x: number; y: number }>({ open: false, x: 0, y: 0 });
  const [windows, setWindows] = useState<OpenWin[]>([]);
  const zRef = useRef(50);
  const isDesktop = useIsDesktop();
  const [worksStartCat, setWorksStartCat] = useState<string | undefined>(undefined);
  const [hiddenShown, setHiddenShown] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.15);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [pos, setPos] = useState<Record<IconKey, [number, number]>>({
    about: [0, 0], works: [0, 0], process: [0, 0], contact: [0, 0],
    cases: [0, 0], blog: [0, 0], stack: [0, 0], status: [0, 0],
  });

  const draggedRef = useRef(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"));
    };
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = (e.key || "").toLowerCase();
      if ((e.metaKey || e.ctrlKey) && k === "k") {
        e.preventDefault();
        beep(520);
        openWindowByKey("terminal");
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (k === "." || k === ">")) {
        e.preventDefault();
        beep(720);
        setHiddenShown((v) => !v);
        setWorksStartCat("archive");
        openWindowByKey("works");
      }
      if (k === "escape") {
        setWindows((ws) => {
          // minimized windows keep their old z (never lowered on minimize), so they must be
          // excluded here — otherwise Escape can silently close an invisible window instead
          // of whatever is actually on top of the visible stack.
          const visible = ws.filter((w) => !w.minimized);
          if (visible.length === 0) return ws;
          const top = visible.reduce((a, b) => (b.z > a.z ? b : a));
          return ws.filter((w) => w.id !== top.id);
        });
        setMenu((m) => ({ ...m, open: false }));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.volume = volume;
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }

  function beep(freq: number) {
    try {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      if (!Ctx) return;
      if (!audioCtxRef.current) audioCtxRef.current = new Ctx();
      const ac = audioCtxRef.current;
      if (ac.state === "suspended") ac.resume();
      const o = ac.createOscillator();
      const g = ac.createGain();
      const n = ac.currentTime;
      o.type = "sine";
      o.frequency.setValueAtTime(freq, n);
      g.gain.setValueAtTime(0.0001, n);
      g.gain.exponentialRampToValueAtTime(0.012, n + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, n + 0.11);
      o.connect(g);
      g.connect(ac.destination);
      o.start(n);
      o.stop(n + 0.13);
    } catch {}
  }

  function nextZ() {
    zRef.current += 1;
    return zRef.current;
  }

  function openWindowByKey(key: WindowKey, opts?: { subId?: string }) {
    setWindows((ws) => {
      // reuse an already-open instance of the same window (same key + subId) instead of
      // stacking duplicates — clicking WORKS twice just brings the existing one to front.
      const existing = ws.find((w) => w.key === key && w.subId === opts?.subId);
      if (existing) {
        return ws.map((w) => (w.id === existing.id ? { ...w, minimized: false, z: nextZ() } : w));
      }
      const n = ws.length;
      return [
        ...ws,
        {
          id: `${key}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          key,
          subId: opts?.subId,
          x: 70 + (n % 6) * 30,
          y: 60 + (n % 6) * 28,
          z: nextZ(),
          minimized: false,
          maximized: false,
        },
      ];
    });
  }

  function closeWindow(id: string) {
    setWindows((ws) => ws.filter((w) => w.id !== id));
  }
  function minimizeWindow(id: string) {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
  }
  function toggleMaximizeWindow(id: string) {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)));
  }
  function focusWindow(id: string) {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, z: nextZ() } : w)));
  }
  function moveWindow(id: string, x: number, y: number) {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }

  function openWin(key: WindowKey) {
    return (e?: React.SyntheticEvent) => {
      if (e?.preventDefault) e.preventDefault();
      if (draggedRef.current) {
        draggedRef.current = false;
        return;
      }
      beep(520);
      setWorksStartCat(undefined);
      setMenu((m) => ({ ...m, open: false }));
      openWindowByKey(key);
    };
  }

  function openCase(id: string) {
    beep(520);
    openWindowByKey("casedetail", { subId: id });
  }

  function openPost(slug: string) {
    beep(520);
    openWindowByKey("postdetail", { subId: slug });
  }

  function drag(key: IconKey) {
    return (e: React.PointerEvent) => {
      const startX = e.clientX;
      const startY = e.clientY;
      const base = pos[key];
      let moved = false;
      const move = (ev: PointerEvent) => {
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;
        if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved = true;
        setPos((cur) => ({ ...cur, [key]: [base[0] + dx, base[1] + dy] }));
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        draggedRef.current = moved;
        setTimeout(() => {
          draggedRef.current = false;
        }, 40);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    };
  }

  const iconHandlers: Record<IconKey, (e?: React.SyntheticEvent) => void> = {
    about: openWin("about"),
    works: openWin("works"),
    process: openWin("process"),
    contact: openWin("contact"),
    cases: openWin("cases"),
    blog: openWin("blog"),
    stack: openWin("stack"),
    status: openWin("status"),
  };

  function renderWindowBody(w: OpenWin) {
    const onClose = () => closeWindow(w.id);
    switch (w.key) {
      case "works":
        return <WorksWindow onClose={onClose} hiddenShown={hiddenShown} startCat={worksStartCat} onOpenCase={openCase} />;
      case "cases":
        return <CasesWindow onClose={onClose} onOpenCase={openCase} />;
      case "casedetail":
        return w.subId ? <CaseDetailWindow caseId={w.subId} onClose={onClose} /> : null;
      case "postdetail":
        return w.subId ? <BlogPostWindow slug={w.subId} onClose={onClose} /> : null;
      case "blog":
        return <BlogWindow onClose={onClose} onOpenPost={openPost} />;
      case "about":
        return <AboutWindow onClose={onClose} />;
      case "process":
        return <ProcessWindow onClose={onClose} />;
      case "contact":
        return <ContactsWindow onClose={onClose} />;
      case "stack":
        return <StackWindow onClose={onClose} />;
      case "safari":
        return <SafariWindow onClose={onClose} />;
      case "terminal":
        return <TerminalWindow onClose={onClose} onOpenWindow={(key) => openWindowByKey(key)} />;
      case "devmode":
        return <DevModeWindow onClose={onClose} />;
      case "status":
        return <StatusWindow onClose={onClose} />;
      case "notes":
        return <NotesWindow onClose={onClose} />;
      case "trash":
        return <TrashWindow onClose={onClose} />;
      case "privacy":
        return <PrivacyWindow onClose={onClose} />;
      case "terms":
        return <TermsWindow onClose={onClose} />;
      case "slots":
        return <SlotsWindow onClose={onClose} />;
      default:
        return null;
    }
  }

  return (
    <div
      className="gj-root"
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        background: "#070707",
        fontFamily: "'JetBrains Mono',ui-monospace,monospace",
        color: "#f5f5f5",
        userSelect: "none",
      }}
    >
      <style jsx global>{`
        @keyframes gjPulse { 0%,100% { opacity: .35; } 50% { opacity: 1; } }
        @keyframes gjRise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .gj-icon-box { transition: border-color .15s ease, color .15s ease; }
        .gj-icon:hover .gj-icon-box { border-color: ${ACCENT}; color: #f5f5f5; }
        .gj-nav:hover { color: #f5f5f5 !important; }
        .gj-dock-btn:hover { background: rgba(239,128,174,.18) !important; color: #f5f5f5 !important; border-color: ${ACCENT} !important; }
        .gj-menu-item:hover { background: rgba(239,128,174,.18); color: #f5f5f5; }

        /* dock brand-icon SVGs (Telegram/GitHub/Slots) are sized here, in pixels, instead
           of em relative to the button's font-size — mixing "icon scales with font-size"
           and "text glyph IS the font-size" under one shared mobile font-size override was
           exactly what made icons shrink unevenly and let GitHub's mark get clipped. */
        .gj-dock-icon-svg { width: 22px; height: 22px; flex: 0 0 auto; }
        .gj-cert-link:hover { background: rgba(239,128,174,.1); color: #f5f5f5 !important; }

        /* mobile browsers resolve 100vh against the largest possible viewport (chrome
           hidden), so absolutely-positioned top/bottom UI can end up outside what's
           actually visible — clipped by, or untappable under, the browser's own bars.
           100dvh tracks the real visible viewport; the plain vh line is the fallback
           for browsers that don't support dvh yet. */
        .gj-root {
          height: 100vh;
          height: 100dvh;
          min-height: 100vh;
          min-height: 100dvh;
        }

        .gj-dock-wrap { bottom: calc(22px + env(safe-area-inset-bottom, 0px)) !important; }
        .gj-legal-nav { bottom: calc(26px + env(safe-area-inset-bottom, 0px)) !important; }
        .gj-hint-right { bottom: calc(26px + env(safe-area-inset-bottom, 0px)) !important; }

        @media (max-width: 680px) {
          .gj-navlinks, .gj-statusline, .gj-hint-right { display: none !important; }
          .gj-icons-grid { grid-template-columns: repeat(2, minmax(0,1fr)) !important; row-gap: clamp(18px,4vh,32px) !important; }
          /* previous mobile sizing (40px buttons, 10px font) made every icon — including
             the em-scaled SVGs — shrink to near-illegible at arm's length, and left the
             GitHub mark visually clipped. Sized up close to desktop proportions instead;
             gap/padding trimmed so 8 buttons + divider still fit a narrow phone screen. */
          .gj-dock { gap: 4px !important; padding: 7px 8px !important; }
          .gj-dock-btn { width: 46px !important; height: 46px !important; font-size: 22px !important; }
          .gj-dock-icon-svg { width: 24px !important; height: 24px !important; }
          .gj-music-panel { gap: 10px !important; padding: 10px 12px !important; }
          .gj-music-panel input[type="range"] { height: 22px !important; }
          /* contain leaves huge black letterbox bars on a portrait phone screen (the
             video's own fill, not something CSS can make transparent) — cover removes
             the bars entirely by filling the viewport and cropping instead, with the
             crop anchored high so the subject's head stays in frame. */
          .gj-hero-video {
            /* portrait phones are nowhere near 16:9 — the tight-fit desktop sizing above
               would render as a thin strip. Cover the full screen and crop instead, anchored
               high so the subject's head stays in frame. */
            width: 100vw !important; width: 100dvw !important;
            height: 100vh !important; height: 100dvh !important;
            object-fit: cover !important; object-position: 50% 15% !important;
          }
          /* the dock (~58px tall) sits at bottom:22px, so legal links need to clear
             its top edge (~80px) instead of sharing the same ~26px offset — that
             overlap was why Privacy/Terms were unreachable behind the dock. */
          .gj-legal-nav { font-size: 8px !important; gap: 5px !important; bottom: calc(92px + env(safe-area-inset-bottom, 0px)) !important; }
          .gj-finder-body { grid-template-columns: 1fr !important; grid-template-rows: auto 1fr !important; }
          .gj-finder-sidebar { flex-direction: row !important; flex-wrap: nowrap !important; overflow-x: auto !important; overflow-y: visible !important; border-right: 0 !important; border-bottom: 1px solid rgba(255,255,255,.1) !important; }
          .gj-finder-sidebar-hide { display: none !important; }
          .gj-finder-sidebar .gj-finder-item { flex: 0 0 auto !important; }
        }
      `}</style>

      {/* background video loop, no audio track (stripped at transcode; also muted as a second
          safety net). The element is sized to its own 16:9 aspect ratio (via the min() pair
          below) instead of stretched to fill the viewport box — on any screen wider or
          narrower than 16:9 (e.g. 21:9 ultrawide), stretching the box while using
          object-fit:contain leaves letterbox bars WELL INSIDE the box, far from the mask's
          fade zone, so the black bars render as a hard, visible rectangle. Sizing the element
          itself to the tight-fit box makes the element's true edge equal the video's real
          edge on every screen, so the mask below always fades the actual visible boundary. */}
      <video
        className="gj-hero-video"
        src="/desktop/hero-loop-v6.mp4" /* PREVIEW — v1..v5 (hero-loop.mp4, -v2..-v5) all kept, final pick pending */
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: "min(100vw, calc(100dvh * 16 / 9))",
          height: "min(100dvh, calc(100vw * 9 / 16))",
          objectFit: "cover",
          // no CSS filter here on purpose: a contrast/brightness filter applied only to the
          // video pushes its near-black matte fill (#070707) to true black (0,0,0) while the
          // surrounding page stays #070707 — a small but very visible seam exactly at the
          // video's edge, on every screen size. Mood/grain comes from the vignette + grain
          // overlays below instead, since those cover the full viewport uniformly (video AND
          // surrounding page alike) and can't create an edge.
          //
          // true per-pixel alpha isn't viable here (verified: VP9/VP8 alpha-in-WebM both
          // silently drop the alpha channel on this server's ffmpeg build, and animated
          // WebP alpha, while real, encodes to 10-20MB+ for this length) — so as a second,
          // defensive layer against any remaining edge, the video's own boundary is faded to
          // transparent just before the element edge, dissolving into the page background.
          WebkitMaskImage: "radial-gradient(120% 105% at 50% 44%, #000 68%, transparent 100%)",
          maskImage: "radial-gradient(120% 105% at 50% 44%, #000 68%, transparent 100%)",
        }}
      />

      {/* film-grain / matte layer — breaks up smooth gradients so the video reads as styled, not soft */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5, mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "140px 140px",
        }}
      />

      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 50% 40%,transparent 30%,rgba(0,0,0,.72) 100%)", pointerEvents: "none" }} />
      {/* extra scrim centered on the hero text/icon block specifically — the vignette above
          darkens the edges but leaves the center (where the copy sits) mostly untouched */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(62% 56% at 50% 36%,rgba(0,0,0,.6),transparent 72%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "#070707", opacity: 0.3, pointerEvents: "none" }} />

      {/* SYSTEM BAR */}
      <div
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 40,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 16px", background: "rgba(18,18,20,.62)", backdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(255,255,255,.10)", fontSize: 11, letterSpacing: ".14em", zIndex: 40,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span style={{ color: ACCENT, fontSize: 13 }}>●</span>
          <span style={{ fontWeight: 700 }}>GR33NJJ.DEV</span>
          <span className="gj-navlinks" style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <span className="gj-nav" onClick={iconHandlers.works} style={{ color: "rgba(255,255,255,.58)", cursor: "pointer" }}>{t("Works", "Работы")}</span>
            <span className="gj-nav" onClick={iconHandlers.process} style={{ color: "rgba(255,255,255,.58)", cursor: "pointer" }}>{t("Approach", "Подход")}</span>
            <span className="gj-nav" onClick={iconHandlers.contact} style={{ color: "rgba(255,255,255,.58)", cursor: "pointer" }}>{t("Contacts", "Контакты")}</span>
            <span className="gj-nav" onClick={iconHandlers.blog} style={{ color: "rgba(255,255,255,.58)", cursor: "pointer" }}>{t("Blog", "Блог")}</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, color: "rgba(255,255,255,.58)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 2, padding: 2, border: "1px solid rgba(255,255,255,.16)", borderRadius: 6 }}>
            <span
              onClick={() => setLanguage("en")}
              style={{ padding: "2px 7px", borderRadius: 4, cursor: "pointer", background: ru ? "transparent" : ACCENT, color: ru ? "rgba(255,255,255,.58)" : "#111" }}
            >
              EN
            </span>
            <span
              onClick={() => setLanguage("ru")}
              style={{ padding: "2px 7px", borderRadius: 4, cursor: "pointer", background: ru ? ACCENT : "transparent", color: ru ? "#111" : "rgba(255,255,255,.58)" }}
            >
              RU
            </span>
          </span>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#28c840", animation: "gjPulse 2.4s ease-in-out infinite" }} />
          <span className="gj-statusline" style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span>{t("AVAILABLE · REPLY WITHIN A DAY", "НА СВЯЗИ · ОТВЕЧАЮ В ТЕЧЕНИЕ ДНЯ")}</span>
            <span>⌁</span>
            <span>▰</span>
          </span>
          <span style={{ color: "#f5f5f5" }}>{clock}</span>
        </div>
      </div>

      {/* MAIN */}
      <div
        onContextMenu={(e) => {
          e.preventDefault();
          setMenu({ open: true, x: Math.min(e.clientX, window.innerWidth - 250), y: Math.min(e.clientY, window.innerHeight - 260) });
        }}
        onClick={() => menu.open && setMenu((m) => ({ ...m, open: false }))}
        style={{
          position: "absolute", inset: "40px 0 116px 0", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "clamp(14px,4vh,50px)", zIndex: 10,
        }}
      >
        <section key={lang} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, animation: "gjRise .8s cubic-bezier(.16,1,.3,1) both" }}>
          <div style={{ fontSize: "clamp(8px,1.4vh,10px)", letterSpacing: ".32em", color: "rgba(255,255,255,.62)", textShadow: "0 2px 10px rgba(0,0,0,.9)" }}>
            FULLSTACK · FRONTEND · BACKEND · DESIGN
          </div>
          <h1 style={{ margin: 0, fontSize: "clamp(22px,min(4.4vw,7vh),58px)", fontWeight: 700, letterSpacing: "-.01em", lineHeight: 1.05, textAlign: "center", textShadow: "0 2px 8px rgba(0,0,0,.85), 0 8px 30px rgba(0,0,0,.7)" }}>
            {ru ? <>Продукт со всех сторон,<br />один инженер.</> : <>Every facet of your product,<br />one engineer.</>}
          </h1>
          <div style={{ fontSize: "clamp(9px,1.8vh,12px)", letterSpacing: ".12em", color: "rgba(255,255,255,.72)", textAlign: "center", maxWidth: 560, lineHeight: 1.7, textShadow: "0 2px 10px rgba(0,0,0,.9)" }}>
            {t("I turn raw ideas into products that look expensive and ship on time.", "Превращаю сырые идеи в продукты, которые выглядят дорого и выходят в срок.")}
          </div>
        </section>

        <section className="gj-icons-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "clamp(12px,2vw,38px) clamp(14px,2.4vw,44px)", alignItems: "flex-start" }}>
          {ICONS.map((icon) => (
            // Entrance animation lives on this wrapper. `animation-fill-mode: both`
            // permanently pins the animated `transform` to its end-keyframe value,
            // which would otherwise clobber the drag offset if both lived on one
            // element — that was the reason dragging silently did nothing.
            <div
              key={icon.key}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(5px,1.2vh,10px)",
                animation: `gjRise .7s cubic-bezier(.16,1,.3,1) ${icon.delay} both`,
              }}
            >
              <button
                type="button"
                className="gj-icon"
                onPointerDown={drag(icon.key)}
                onClick={iconHandlers[icon.key]}
                style={{
                  transform: `translate(${pos[icon.key][0]}px,${pos[icon.key][1]}px)`,
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(5px,1.2vh,10px)",
                  background: "none", border: 0, padding: 0, cursor: "grab", fontFamily: "inherit", color: "inherit",
                  touchAction: "none",
                }}
              >
                <span
                  className="gj-icon-box"
                  style={{
                    position: "relative", width: "clamp(58px,9vw,82px)", height: "clamp(40px,7.6vh,60px)",
                    border: "1px solid rgba(255,255,255,.34)", borderTop: `3px solid ${ACCENT}`,
                    background: "linear-gradient(180deg,rgba(38,38,42,.92),rgba(16,16,18,.92))", backdropFilter: "blur(10px)",
                    boxShadow: "0 14px 40px rgba(0,0,0,.55)", borderRadius: 6, display: "grid", placeItems: "center",
                    fontSize: "clamp(14px,2.6vh,20px)", color: "rgba(255,255,255,.86)",
                  }}
                >
                  {icon.glyph}
                  {icon.key === "works" && (
                    <span style={{ position: "absolute", top: -7, right: -7, minWidth: 20, height: 20, borderRadius: 10, background: ACCENT, color: "#111", fontSize: 10, fontWeight: 700, display: "grid", placeItems: "center" }}>
                      {PROJECTS.length}
                    </span>
                  )}
                  {icon.key === "status" && (
                    <span style={{ position: "absolute", top: -7, right: -7, width: 14, height: 14, borderRadius: 7, background: "#28c840", animation: "gjPulse 2.4s ease-in-out infinite" }} />
                  )}
                </span>
                <span style={{ fontSize: "clamp(8px,1.5vh,10px)", letterSpacing: ".2em", color: "#f5f5f5", textShadow: "0 1px 6px rgba(0,0,0,.9)" }}>
                  {t(icon.label, icon.labelRu)}
                </span>
              </button>
            </div>
          ))}
        </section>
      </div>

      {/* DOCK */}
      <div className="gj-dock-wrap" style={{ position: "absolute", left: 0, right: 0, bottom: 22, display: "flex", justifyContent: "center", zIndex: 30, pointerEvents: "none" }}>
        <div
          className="gj-dock"
          style={{
            display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 20,
            background: "rgba(22,22,24,.68)", backdropFilter: "blur(22px)", border: "1px solid rgba(255,255,255,.14)",
            boxShadow: "0 26px 90px rgba(0,0,0,.48)", pointerEvents: "auto", animation: "gjRise .7s cubic-bezier(.16,1,.3,1) .5s both",
          }}
        >
          <DockButton icon={<TelegramGlyph />} title="Telegram" onClick={() => window.open("https://t.me/gr33njj", "_blank", "noopener")} />
          <DockButton icon={<GitHubGlyph />} title="GitHub" onClick={() => window.open("https://github.com/gr33njj", "_blank", "noopener")} />
          <DockButton label="✎" title={t("Notes", "Заметки")} onClick={openWin("notes")} />
          <DockButton label="♫" title={t("Music", "Музыка")} onClick={() => setMusicOpen((v) => !v)} />
          <DockButton label="◍" title="Safari" onClick={openWin("safari")} />
          <span style={{ width: 1, height: 34, background: "rgba(255,255,255,.14)" }} />
          <DockButton icon={<SlotsGlyph />} title={t("Slots", "Слоты")} onClick={openWin("slots")} />
          <DockButton label="⌫" title={t("Trash", "Корзина")} onClick={openWin("trash")} />
        </div>
      </div>

      <nav className="gj-legal-nav" style={{ position: "absolute", left: 20, bottom: 26, display: "flex", flexDirection: "column", gap: 8, fontSize: 10, letterSpacing: ".16em", zIndex: 30 }}>
        <a href="#" onClick={openWin("privacy")} style={{ color: "rgba(255,255,255,.34)" }}>PRIVACY POLICY</a>
        <a href="#" onClick={openWin("terms")} style={{ color: "rgba(255,255,255,.34)" }}>TERMS OF SERVICE</a>
      </nav>

      <div className="gj-hint-right" style={{ position: "absolute", right: 20, bottom: 26, textAlign: "right", fontSize: 10, lineHeight: 1.9, letterSpacing: ".14em", color: "rgba(255,255,255,.3)", zIndex: 30 }}>
        {t("RIGHT CLICK", "ПРАВЫЙ КЛИК")} — {t("SYSTEM MENU", "СИСТЕМНОЕ МЕНЮ")}
        <br />
        ⌘K — {t("TERMINAL", "ТЕРМИНАЛ")} · {t("FOLDERS CAN BE DRAGGED", "ПАПКИ МОЖНО ПЕРЕТАСКИВАТЬ")}
      </div>

      {/* CONTEXT MENU */}
      {menu.open && (
        <div
          style={{
            position: "fixed", top: menu.y, left: menu.x, minWidth: 236, padding: 6, borderRadius: 12,
            background: "rgba(22,22,24,.86)", backdropFilter: "blur(22px)", border: "1px solid rgba(255,255,255,.14)",
            boxShadow: "0 26px 90px rgba(0,0,0,.48)", fontSize: 11, letterSpacing: ".1em", zIndex: 500,
          }}
        >
          <MenuItem label={t("Open works", "Открыть работы")} hint="↗" onClick={iconHandlers.works} />
          <MenuItem label={t("Terminal", "Терминал")} hint="⌘K" onClick={openWin("terminal")} />
          <MenuItem label={t("Developer Mode", "Режим разработчика")} hint="⌁" onClick={openWin("devmode")} />
          <div style={{ height: 1, margin: "5px 8px", background: "rgba(255,255,255,.12)" }} />
          <MenuItem label={t("System status", "Статус системы")} hint="⌘R" onClick={openWin("status")} />
          <MenuItem label={t("Delete…", "Удалить…")} hint="⌫" onClick={openWin("trash")} />
        </div>
      )}

      {/* MUSIC — audio element persists across panel open/close so playback doesn't cut out */}
      <audio ref={audioRef} src="/desktop/track.mp3" loop preload="none" onEnded={() => setPlaying(false)} />
      {musicOpen && (
        <div
          className="gj-music-panel"
          style={{
            // centered via left:0/right:0/margin:auto instead of left:50%+transform, on
            // purpose: the gjRise entrance animation below also animates `transform`
            // (translateY), and a CSS animation on a property fully replaces the element's
            // inline value for that property — combining it with an inline
            // transform:translateX(-50%) would silently drop the horizontal centering the
            // moment the animation finishes, leaving the panel's left edge pinned to
            // screen-center instead of the panel itself being centered (this is the exact
            // bug that made the panel look like it was "sliding right").
            position: "absolute", left: 0, right: 0, marginLeft: "auto", marginRight: "auto",
            bottom: "calc(96px + env(safe-area-inset-bottom,0px))",
            zIndex: 35, boxSizing: "border-box",
            display: "flex", alignItems: "center", gap: 14,
            width: "min(310px, calc(100vw - 32px))", padding: "12px 16px", borderRadius: 16,
            background: "rgba(22,22,24,.86)", backdropFilter: "blur(22px)", border: "1px solid rgba(255,255,255,.14)",
            boxShadow: "0 26px 90px rgba(0,0,0,.48)", animation: "gjRise .3s cubic-bezier(.16,1,.3,1) both",
          }}
        >
          <button
            type="button"
            onClick={toggleMusic}
            style={{
              flex: "0 0 auto", width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(255,255,255,.2)",
              background: "rgba(255,255,255,.06)", color: "#f5f5f5", fontSize: 13, cursor: "pointer",
            }}
          >
            {playing ? "❙❙" : "▶"}
          </button>
          <div style={{ flex: "1 1 auto", minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Dracula</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,.5)" }}>Tame Impala</div>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(volume * 100)}
            onChange={(e) => setVolume(Number(e.target.value) / 100)}
            title={`${Math.round(volume * 100)}%`}
            style={{ flex: "1 1 60px", minWidth: 0, maxWidth: 80, accentColor: ACCENT }}
          />
          <button
            type="button"
            onClick={() => setMusicOpen(false)}
            style={{ flex: "0 0 auto", background: "none", border: 0, color: "rgba(255,255,255,.5)", fontSize: 14, cursor: "pointer" }}
          >
            ×
          </button>
        </div>
      )}

      {/* MINIMIZED — desktop only; a small strip of chips to restore windows tucked away
          via the yellow dot, since a floating window otherwise has nowhere to go */}
      {isDesktop && windows.some((w) => w.minimized) && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 90, display: "flex", justifyContent: "center", zIndex: 490, pointerEvents: "none" }}>
          <div style={{ display: "flex", gap: 8, pointerEvents: "auto" }}>
            {windows.filter((w) => w.minimized).map((w) => (
              <button
                key={w.id}
                type="button"
                onClick={() => openWindowByKey(w.key, { subId: w.subId })}
                style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 20,
                  border: "1px solid rgba(255,255,255,.14)", background: "rgba(22,22,24,.86)", backdropFilter: "blur(22px)",
                  color: "rgba(255,255,255,.75)", fontFamily: "inherit", fontSize: 10.5, letterSpacing: ".06em", cursor: "pointer",
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e" }} />
                {t(WINDOW_TITLES[w.key][0], WINDOW_TITLES[w.key][1])}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* WINDOWS — each gets its own position/z/minimize/maximize via WindowInstance context,
          so WorksWindow/AboutWindow/etc. don't need to know anything about it themselves. */}
      {windows.map((w) => (
        <WindowInstance
          key={w.id}
          value={{
            x: w.x, y: w.y, z: w.z, maximized: w.maximized, visible: !w.minimized, draggable: isDesktop,
            onFocus: () => focusWindow(w.id),
            onMinimize: () => minimizeWindow(w.id),
            onToggleMaximize: () => toggleMaximizeWindow(w.id),
            onMove: (x, y) => moveWindow(w.id, x, y),
          }}
        >
          {renderWindowBody(w)}
        </WindowInstance>
      ))}
    </div>
  );
}

function DockButton({
  label, icon, title, onClick,
}: {
  label?: string; icon?: React.ReactNode; title: string; onClick: (e?: React.SyntheticEvent) => void;
}) {
  return (
    <button
      type="button"
      className="gj-dock-btn"
      onClick={onClick}
      title={title}
      style={{
        width: 52, height: 52, borderRadius: 14, border: "1px solid rgba(255,255,255,.12)",
        background: "rgba(255,255,255,.05)", color: "rgba(255,255,255,.72)", fontFamily: "inherit",
        // every label left here is a single glyph (✎ ♫ ◍ ⌫) — real brand/logo icons go
        // through the `icon` prop (SVG, sized by the .gj-dock-icon-svg CSS rule below, not
        // by font-size) so there's no more "long label" case to shrink for.
        fontSize: 18, letterSpacing: ".06em", cursor: "pointer",
        display: "grid", placeItems: "center",
      }}
    >
      {icon ?? label}
    </button>
  );
}

function TelegramGlyph() {
  return (
    <svg className="gj-dock-icon-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.259.259-.529.259l.19-2.72 4.94-4.465c.216-.19-.047-.297-.336-.107l-6.104 3.837-2.626-.82c-.573-.18-.583-.573.12-.847l10.264-3.958c.474-.174.888.11.735.837z" />
    </svg>
  );
}

function SlotsGlyph() {
  return (
    <svg
      className="gj-dock-icon-svg"
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="15" height="15.5" rx="2.6" />
      <circle cx="7.4" cy="12.75" r="1.35" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="12.75" r="1.35" fill="currentColor" stroke="none" />
      <circle cx="13.6" cy="12.75" r="1.35" fill="currentColor" stroke="none" />
      <path d="M20.7 7v4.3" />
      <circle cx="20.7" cy="13" r="1.35" fill="currentColor" stroke="none" />
    </svg>
  );
}

function GitHubGlyph() {
  return (
    <svg className="gj-dock-icon-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function MenuItem({ label, hint, onClick }: { label: string; hint: string; onClick: (e?: React.SyntheticEvent) => void }) {
  return (
    <div
      className="gj-menu-item"
      onClick={onClick}
      style={{ display: "flex", justifyContent: "space-between", gap: 20, padding: "9px 10px", borderRadius: 8, cursor: "pointer", color: "rgba(255,255,255,.82)" }}
    >
      <span>{label}</span>
      <span style={{ color: "rgba(255,255,255,.38)" }}>{hint}</span>
    </div>
  );
}
