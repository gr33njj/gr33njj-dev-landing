import type { Metadata } from "next";
import MyDoctorCase from "@/components/case/MyDoctorCase";

export const metadata: Metadata = {
  title: "Кейс: приложение лояльности и записи для медклиник — gr33njj.dev",
  description:
    "«Мой Доктор» — PWA и мобильное приложение для медцентра: онлайн-запись, электронная медкарта, бонусы и сертификаты. Тот же движок адаптируется под вашу клинику.",
};

export default function Page() {
  return <MyDoctorCase />;
}
