"use client";

import { useEffect, useRef } from "react";

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    // Увеличил количество частиц с 50 до 80
    const particleCount = 80; 

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.8, // Немного быстрее движение
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 3 + 1, // Увеличил размер (было * 2)
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // Сделал частицы ярче (было 0.5)
      ctx.fillStyle = "rgba(154, 19, 232, 0.8)"; 
      // Линии тоже ярче и чуть толще визуально за счет цвета
      ctx.strokeStyle = "rgba(154, 19, 232, 0.25)"; 

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw lines
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Увеличил дистанцию соединения (было 150)
          if (dist < 180) {
            ctx.beginPath();
            ctx.lineWidth = 1 - dist / 180; // Линии тоньше к краям
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    };

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-background">
      {/* Grid Pattern Overlay - сделал чуть заметнее (opacity-30) */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      {/* Radial Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px]" />

      {/* Canvas for particles - убрал opacity с самого canvas, регулируем внутри draw */}
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
