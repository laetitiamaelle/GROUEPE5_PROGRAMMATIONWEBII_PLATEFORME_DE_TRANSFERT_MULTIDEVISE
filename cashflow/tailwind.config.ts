import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cash: {
          bg: "#0f1115",
          panel: "#161b22",
          elevated: "#1a1d24",
          card: "#111827",
          line: "rgba(255,255,255,0.06)",
          muted: "#9ca3af",
          subtle: "#6b7280",
        },
        accent: "#facc15",
        danger: "#f87171",
        success: "#34d399",
      },
      boxShadow: {
        card: "0 0 0 1px rgba(255,255,255,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
