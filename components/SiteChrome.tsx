"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Background from "@/components/ui/Background";

/**
 * The desktop OS experience — now the homepage ("/"), still reachable at "/desktop" via a
 * redirect for old links — renders its own full-viewport "OS" chrome (top bar, dock) and
 * must not get the marketing site's Navbar/Background/footer stacked on top.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDesktop = pathname === "/" || pathname?.startsWith("/desktop");

  if (isDesktop) return <>{children}</>;

  return (
    <>
      <Background />
      <Navbar />
      <main className="relative z-[1]">{children}</main>
      <footer className="relative z-[1] flex flex-wrap items-center justify-between gap-4 border-t border-line px-5 py-10 sm:px-10 lg:px-16">
        <span className="font-mono text-[13px] text-muted-faint">
          gr33njj<span className="text-accent-hover">.dev</span> © {new Date().getFullYear()}
        </span>
        <span className="font-mono text-xs text-muted-ghost">сделано с 💜 by gr33njj</span>
      </footer>
    </>
  );
}
