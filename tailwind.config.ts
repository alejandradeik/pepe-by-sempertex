import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand — Sempertex purple (#7e57c5)
        brand: {
          50:  "#f3f0fb",
          100: "#e7e1f7",
          200: "#cfc3ee",
          300: "#b3a0e3",
          400: "#9278d4",
          500: "#7e57c5",
          600: "#6b47ad",
          700: "#593a93",
          800: "#472e78",
          900: "#35225d",
          950: "#1d113a",
        },
        // Warm accent — Sempertex coral/red
        rose: {
          400: "#f07068",
          500: "#e95144",
          600: "#d03f33",
        },
        // Warm amber
        amber: {
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
        },
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "system-ui", "sans-serif"],
        mono: ["monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        "card":    "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
        "card-md": "0 4px 12px -2px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.04)",
        "card-lg": "0 12px 30px -4px rgb(0 0 0 / 0.10), 0 4px 8px -4px rgb(0 0 0 / 0.06)",
        "brand":   "0 8px 24px -4px rgb(126 87 197 / 0.35)",
        "brand-sm":"0 4px 12px -2px rgb(126 87 197 / 0.25)",
        "glow":    "0 0 0 4px rgb(126 87 197 / 0.15)",
      },
      backgroundImage: {
        "gradient-brand":  "linear-gradient(135deg, #593a93 0%, #7e57c5 55%, #e95144 100%)",
        "gradient-hero":   "linear-gradient(160deg, #1d113a 0%, #35225d 40%, #593a93 70%, #7e57c5 100%)",
        "gradient-warm":   "linear-gradient(135deg, #7e57c5 0%, #e95144 100%)",
        "gradient-subtle": "linear-gradient(180deg, #f8f6fd 0%, #ffffff 100%)",
        "gradient-card":   "linear-gradient(145deg, #ffffff 0%, #faf8ff 100%)",
        "gradient-footer": "linear-gradient(160deg, #0a0618 0%, #15092d 50%, #1d113a 100%)",
      },
      animation: {
        "fade-up":     "fadeUp 0.5s ease-out",
        "fade-in":     "fadeIn 0.4s ease-out",
        "slide-right": "slideRight 0.3s ease-out",
        "pulse-slow":  "pulse 3s ease-in-out infinite",
        "float":       "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideRight: {
          "0%":   { opacity: "0", transform: "translateX(-8px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
