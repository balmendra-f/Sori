/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        vibe: {
          dark: "#0d0e12",
          surface: "#16171e",
          card: "#181920",
          border: "#23242c",
          pill: "#1a1b23",
          pillActive: "#8b5cf6",
          purple: "#8b5cf6",
          purpleLight: "#a78bfa",
          purpleDark: "#7c3aed",
          muted: "#8e8f99",
          track: "#101116",
          barInactive: "#2a2b36",
          liked: "#f43f5e",
        },
      },
    },
  },
  plugins: [],
};
