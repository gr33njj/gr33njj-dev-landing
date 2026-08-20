import type { Metadata } from "next";
import GDesktop from "@/components/desktop/GDesktop";

export const metadata: Metadata = {
  title: "gr33njj.dev — Every facet of your product, one engineer",
  description:
    "Fullstack engineer, 5+ years — I design, build and ship complete products solo: a clinic app now serving 12,000+ patients, SEO infrastructure ranking real regional traffic, AI-agent CI pipelines. Frontend, backend, architecture and design, handled end to end.",
};

// forced dynamic on purpose: this is under active development, and Next's default
// full-route static cache serves year-old HTML pinned to stale JS chunk hashes to real
// visitors the moment it's cached once — every fix would land on the server but never
// reach anyone already cached.
export const dynamic = "force-dynamic";

export default function Home() {
  return <GDesktop />;
}
