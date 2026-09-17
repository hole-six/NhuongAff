import type { Config } from "tailwindcss";

// Design tokens: hệ trắng–hồng lấy màu từ linh vật thỏ (xem globals.css).
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          active: "rgb(var(--primary-active) / <alpha-value>)",
          neutral: "rgb(var(--primary-neutral) / <alpha-value>)",
          pale: "rgb(var(--primary-pale) / <alpha-value>)",
        },
        canvas: {
          DEFAULT: "rgb(var(--canvas) / <alpha-value>)",
          soft: "rgb(var(--canvas-soft) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          deep: "rgb(var(--ink-deep) / <alpha-value>)",
        },
        body: "rgb(var(--body) / <alpha-value>)",
        mute: "rgb(var(--mute) / <alpha-value>)",
        positive: {
          DEFAULT: "#2ead4b",
          deep: "#054d28",
        },
        warning: {
          DEFAULT: "#ffd11a",
          deep: "#b86700",
          content: "#4a3b1c",
        },
        negative: {
          DEFAULT: "#d03238",
          deep: "#a72027",
          darkest: "#a7000d",
          bg: "#320707",
        },
        accent: {
          orange: "#ffc091",
          cyan: "#38c8ff",
        },
        bunny: {
          cream: "rgb(var(--bunny-cream) / <alpha-value>)",
          blush: "rgb(var(--bunny-blush) / <alpha-value>)",
          ear: "rgb(var(--bunny-ear) / <alpha-value>)",
          star: "rgb(var(--bunny-star) / <alpha-value>)",
        },
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 0.61, 0.36, 1)",
        spring: "cubic-bezier(0.34, 1.32, 0.64, 1)",
      },
      boxShadow: {
        glow: "0 6px 24px rgba(209, 58, 107, 0.22), 0 2px 6px rgba(209, 58, 107, 0.12)",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        pill: "9999px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      spacing: {
        xxs: "2px",
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "48px",
      },
    },
  },
  plugins: [],
};

export default config;
