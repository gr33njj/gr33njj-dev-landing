import type { Metadata } from "next";
import SkangarCase from "@/components/case/SkangarCase";

export const metadata: Metadata = {
  title: "Кейс: SEO-инфраструктура для 75 городов — gr33njj.dev",
  description:
    "Как лендинг для строительной компании дорос до content-инфраструктуры: 75 городских страниц, база знаний из 13 статей, структурированные данные и техническая SEO-диагностика.",
};

export default function Page() {
  return <SkangarCase />;
}
