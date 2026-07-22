import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#05060d",
        foreground: "#e9f0ff",
        surface: "rgba(140,180,240,0.045)",
        line: "rgba(140,180,240,0.12)",
        accent: {
          DEFAULT: "#67e8f9",
          hover: "#22d3ee",
          purple: "#a855f7",
          blue: "#38bdf8",
          mint: "#34f5c5",
        },
        muted: {
          DEFAULT: "#aab6d0",
          dim: "#97a3bd",
          faint: "#8996b2",
          ghost: "#6b7794",
        },
      },
      fontFamily: {
        sans: ["var(--font-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-ice": "linear-gradient(135deg, #67e8f9, #a855f7)",
      },
      animation: {
        shimmer: "shimmer 6s linear infinite",
        spin3d: "spin3d 18s linear infinite",
        floaty: "floaty 7s ease-in-out infinite",
        "glow-pulse": "glowPulse 6s ease-in-out infinite",
        aurora: "auroraDrift 22s ease-in-out infinite",
        "aurora-reverse": "auroraDrift 26s ease-in-out infinite reverse",
        "aurora-slow": "auroraDrift 30s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        shard: "shardFloat 9s ease-in-out infinite",
        "shard-reverse": "shardFloat 11s ease-in-out infinite reverse",
        "shard-fast": "shardFloat 7s ease-in-out infinite",
        sheen: "sheen 4.5s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          to: { backgroundPosition: "200% center" },
        },
        spin3d: {
          to: { transform: "rotateY(360deg)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.08)" },
        },
        auroraDrift: {
          "0%, 100%": { transform: "translate3d(0,0,0) rotate(0deg)" },
          "33%": { transform: "translate3d(6%,-4%,0) rotate(8deg)" },
          "66%": { transform: "translate3d(-5%,5%,0) rotate(-6deg)" },
        },
        marquee: {
          to: { transform: "translateX(-50%)" },
        },
        shardFloat: {
          "0%, 100%": { transform: "translateY(0) rotate(45deg)" },
          "50%": { transform: "translateY(-24px) rotate(225deg)" },
        },
        sheen: {
          "0%": { transform: "translateX(-120%) skewX(-18deg)" },
          "100%": { transform: "translateX(320%) skewX(-18deg)" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
export default config;
