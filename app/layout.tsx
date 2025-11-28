import { LanguageProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Background from "@/components/ui/Background";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "gr33njj — Multitool Engineer",
  description: "Backend, DevOps, Frontend. Turning flexibility into production-ready results.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${mono.variable} bg-background text-white overflow-x-hidden`}>
        <LanguageProvider>
          <Background />
          <Navbar />
          <main>{children}</main>
          <footer className="py-8 text-center text-zinc-600 text-sm font-mono border-t border-white/5">
            © {new Date().getFullYear()} gr33njj.dev
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}


