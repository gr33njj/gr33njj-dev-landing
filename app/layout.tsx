import { LanguageProvider } from "@/lib/i18n";
import SiteChrome from "@/components/SiteChrome";
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
          <SiteChrome>{children}</SiteChrome>
        </LanguageProvider>
      </body>
    </html>
  );
}
