import type { Metadata } from "next";
import GazonCase from "@/components/case/GazonCase";

export const metadata: Metadata = {
  title: "Кейс: GAZON — Unity через трёх слепых AI-агентов — gr33njj.dev",
  description:
    "Как устроен CI-пайплайн, который собирает Unity 6 WebGL-игру через self-hosted раннер и headless Claude Code — без единого открытия Unity Editor на VPS.",
};

export default function Page() {
  return <GazonCase />;
}
