import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import Mindset from "@/components/Mindset";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <Hero />
      <Services />
      <Projects />
      <Stack />
      <Mindset />
      <Contact />
    </div>
  );
}


