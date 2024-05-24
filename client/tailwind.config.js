/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        irishGrover: ["Irish Grover", "cursive"],
        inder: ["Inder", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
