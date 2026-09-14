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
        bg: "var(--color-bg)",
        ink: "var(--color-ink)",
        line: "var(--color-line)",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-avenir)", "'Avenir Next'", "'Avenir Next Arabic'", "sans-serif"],
        seasons: ["var(--font-seasons)", "'The Seasons'", "serif"],
      },
      letterSpacing: {
        label: "0.14em",
      },
    },
  },
  plugins: [],
};
export default config;
