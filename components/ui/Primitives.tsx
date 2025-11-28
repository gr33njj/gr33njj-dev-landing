import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ className, hover = true, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/5 bg-surface/50 p-6 backdrop-blur-sm transition-all duration-300",
        hover && "hover:border-accent/30 hover:bg-surface/80 hover:shadow-lg hover:shadow-accent/5 group",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Section({ id, className, children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={cn("py-20 md:py-32 px-6", className)}>
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-5xl font-bold mb-4 font-mono tracking-tight">
      <span className="text-accent">#</span> {children}
    </h2>
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-1 text-[10px] md:text-xs font-mono uppercase tracking-wider border border-white/10 rounded bg-white/5 text-zinc-300">
      {children}
    </span>
  );
}


