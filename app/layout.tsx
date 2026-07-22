import { LanguageProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Background from "@/components/ui/Background";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";

const grotesk = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-grotesk" });
const mono = JetBrains_Mono({ subsets: ["latin", "cyrillic"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "gr33njj.dev — Every facet of your product, one engineer",
  description:
    "Frontend, backend, architecture, design — handled end to end. I turn raw ideas into products that look expensive and ship on time.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${grotesk.variable} ${mono.variable} bg-background text-foreground overflow-x-hidden font-sans`}>
        <LanguageProvider>
          <Background />
          <Navbar />
          <main className="relative z-[1]">{children}</main>
          <footer className="relative z-[1] flex flex-wrap items-center justify-between gap-4 border-t border-line px-5 py-10 sm:px-10 lg:px-16">
            <span className="font-mono text-[13px] text-muted-faint">
              gr33njj<span className="text-accent-hover">.dev</span> © {new Date().getFullYear()}
            </span>
            <span className="font-mono text-xs text-muted-ghost">сделано с 💜 by gr33njj</span>
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
