"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { WindowChrome, WindowBody } from "./WindowChrome";

const ACCENT = "#ef80ae";
const SYMBOLS = ["🍒", "🍋", "🔔", "💎", "7️⃣"];
const WIN_CHANCE = 0.1;

function randomSymbol() {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

function losingReels(): [string, string, string] {
  // any combo except all-three-matching — re-rolled rather than probability-weighted, so
  // the 10% win chance below stays exact and isn't quietly skewed by symbol odds.
  let reels: [string, string, string];
  do {
    reels = [randomSymbol(), randomSymbol(), randomSymbol()];
  } while (reels[0] === reels[1] && reels[1] === reels[2]);
  return reels;
}

function makePromoCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return `LUCKY10-${code}`;
}

export function SlotsWindow({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  const [reels, setReels] = useState<[string, string, string]>(["🍒", "🍋", "🔔"]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<"idle" | "win" | "lose">("idle");
  const [losses, setLosses] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const spinTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  function tone(freq: number, dur = 0.09, gain = 0.02) {
    try {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      if (!Ctx) return;
      if (!audioCtxRef.current) audioCtxRef.current = new Ctx();
      const ac = audioCtxRef.current;
      if (ac.state === "suspended") ac.resume();
      const o = ac.createOscillator();
      const g = ac.createGain();
      const n = ac.currentTime;
      o.type = "square";
      o.frequency.setValueAtTime(freq, n);
      g.gain.setValueAtTime(0.0001, n);
      g.gain.exponentialRampToValueAtTime(gain, n + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, n + dur);
      o.connect(g);
      g.connect(ac.destination);
      o.start(n);
      o.stop(n + dur + 0.02);
    } catch {}
  }

  function spin() {
    if (spinning) return;
    setSpinning(true);
    setResult("idle");
    tone(220, 0.06, 0.015);

    const won = Math.random() < WIN_CHANCE;
    let ticks = 0;
    const maxTicks = 14;
    spinTimerRef.current = setInterval(() => {
      setReels([randomSymbol(), randomSymbol(), randomSymbol()]);
      tone(260 + Math.random() * 200, 0.04, 0.012);
      ticks += 1;
      if (ticks >= maxTicks) {
        if (spinTimerRef.current) clearInterval(spinTimerRef.current);
        const finalReels: [string, string, string] = won
          ? (() => {
              const s = randomSymbol();
              return [s, s, s];
            })()
          : losingReels();
        setReels(finalReels);
        setSpinning(false);
        if (won) {
          tone(660, 0.12, 0.03);
          setTimeout(() => tone(880, 0.16, 0.03), 90);
          setTimeout(() => tone(1100, 0.22, 0.03), 190);
          setLosses(0);
          setPromoCode(makePromoCode());
          setResult("win");
        } else {
          tone(140, 0.18, 0.02);
          setLosses((l) => l + 1);
          setResult("lose");
        }
      }
    }, 70);
  }

  function loseMessage(): { en: string; ru: string } | null {
    if (losses === 3) return { en: "Maybe don't?", ru: "Может не надо?" };
    if (losses === 4) return { en: "I think you might be a bit too much of a gambler.", ru: "Мне кажется, ты слишком азартный человек." };
    if (losses >= 5) return { en: "You owe me money now.", ru: "Теперь ты должен мне денег." };
    return null;
  }

  const lose = loseMessage();

  return (
    <WindowChrome title={t("SLOTS", "СЛОТЫ")} onClose={onClose} width="min(420px,90vw)" height="min(520px,80vh)">
      <WindowBody>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: "100%", padding: "22px 18px", borderRadius: 14, border: `1px solid ${ACCENT}44`,
              background: "linear-gradient(180deg,rgba(239,128,174,.08),rgba(255,255,255,.02))",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
              {reels.map((s, i) => (
                <div
                  key={i}
                  style={{
                    width: 78, height: 90, borderRadius: 10, border: "1px solid rgba(255,255,255,.16)",
                    background: "rgba(0,0,0,.35)", display: "grid", placeItems: "center", fontSize: 38,
                    boxShadow: "inset 0 2px 10px rgba(0,0,0,.5)",
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={spin}
            disabled={spinning}
            style={{
              width: "100%", padding: "13px 16px", borderRadius: 10, border: "none",
              background: spinning ? "rgba(239,128,174,.4)" : ACCENT, color: "#150a10",
              fontSize: 13, fontWeight: 700, letterSpacing: ".08em", fontFamily: "inherit",
              cursor: spinning ? "default" : "pointer",
            }}
          >
            {spinning ? t("SPINNING…", "КРУТИТСЯ…") : t("SPIN", "КРУТИТЬ")}
          </button>

          {result === "win" && (
            <div
              style={{
                width: "100%", padding: 16, borderRadius: 10, border: "1px solid #34f5c588",
                background: "rgba(52,245,197,.08)", textAlign: "center",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: "#34f5c5", marginBottom: 6 }}>
                {t("Congratulations — you won a 10% discount on your next project!", "Поздравляю — вы выиграли скидку 10% на будущий проект!")}
              </div>
              <div style={{ fontSize: 11, lineHeight: 1.7, color: "rgba(255,255,255,.7)", marginBottom: 10 }}>
                {t(
                  "Message me any way that's convenient and I'll build your project with the discount applied.",
                  "Напишите мне любым удобным способом — реализую ваш заказ со скидкой."
                )}
              </div>
              <div
                style={{
                  display: "inline-block", padding: "7px 14px", borderRadius: 7, border: `1px dashed ${ACCENT}`,
                  fontSize: 12, letterSpacing: ".08em", color: ACCENT, marginBottom: 12,
                }}
              >
                {promoCode}
              </div>
              <div>
                <a
                  href="https://t.me/gr33njj"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block", padding: "9px 16px", borderRadius: 8, background: ACCENT,
                    color: "#150a10", fontSize: 11.5, fontWeight: 700, textDecoration: "none",
                  }}
                >
                  {t("Message me on Telegram", "Написать в Telegram")}
                </a>
              </div>
            </div>
          )}

          {result === "lose" && (
            <div style={{ fontSize: 11.5, color: "rgba(255,255,255,.55)", textAlign: "center" }}>
              {lose ? t(lose.en, lose.ru) : t("No luck this time — spin again?", "Не повезло — попробуете ещё?")}
            </div>
          )}
        </div>
      </WindowBody>
    </WindowChrome>
  );
}
