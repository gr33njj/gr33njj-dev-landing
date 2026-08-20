import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stack from "@/components/Stack";
import Projects from "@/components/Projects";
import Mindset from "@/components/Mindset";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "gr33njj.dev — Every facet of your product, one engineer",
  description:
    "Frontend, backend, architecture, design — handled end to end. I turn raw ideas into products that look expensive and ship on time.",
};

export default function ClassicHome() {
  return (
    <>
      <Hero />
      <Services />
      <Stack />
      <Projects />
      <Mindset />
      <Contact />
    </>
  );
}
