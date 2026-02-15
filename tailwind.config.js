/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        switzer: ["Switzer", "sans-serif"],
      },
      fontSize: {
        "hero-name": ["clamp(1.5rem, 8vw, 3rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
      },
    },
  },
  plugins: [],
};
