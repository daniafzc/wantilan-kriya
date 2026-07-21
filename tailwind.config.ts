import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1a1a1a",
        "ink-soft": "#4a4a4a",
        "ink-muted": "#7a7a7a",
        paper: "#fafaf7",
        line: "#e5e0d3",
        "line-soft": "#efeae0",
        terracotta: "#c2553a",
        "terracotta-soft": "#f3d9d0",
        "terracotta-deep": "#9c402a",
        sand: "#d9c9a6",
        "sand-soft": "#f4ecd8",
        green: "#4a6b48",
        "green-soft": "#d6e0d3",
        gold: "#b8893d",
        "gold-soft": "#f1e3c4",
        plum: "#6b3f5b",
        "plum-soft": "#e8d6df",
        teal: "#2f6b6b",
        "teal-soft": "#d1e3e3",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: [
          "var(--font-work-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
