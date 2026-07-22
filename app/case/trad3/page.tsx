import type { Metadata } from "next";
import Trad3Case from "@/components/case/Trad3Case";

export const metadata: Metadata = {
  title: "Кейс: TRAD3 — алгоритмическая система разворотов — gr33njj.dev",
  description:
    "Как превратить паттерн разворота тренда в объективный скоринг без перерисовки: детекция BOS, Telegram-алерты, FastAPI-панель поверх Binance.",
};

export default function Page() {
  return <Trad3Case />;
}
