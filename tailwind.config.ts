import type { Config } from "tailwindcss";

const config = {
  mode: "jit",
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./app/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "var(--input)",
        ring: "var(--ring)",
        foreground: "var(--foreground)",
        background: "var(--background)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      gridTemplateColumns: {
        new4: "repeat(4, minmax(100px, 500px))",
        repeat_115: "repeat(auto-fit, minmax(115px, 1fr))",
      },
    },
    screens: {
      "6xl": { max: "1550px" },
      "5xl": { max: "1450px" },
      "4xl": { max: "1350px" },
      "3xl": { max: "1200px" },
      "2xl": { max: "1270px" },
      xl: { max: "1200px" },
      lg: { max: "990px" },
      md: { max: "768px" },
      ss: { max: "650px" },
      sm: { max: "550px" },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
