/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
   theme: {
      extend: {},
      fontFamily: {
         clash: ["Clash Grotesk", "sans-serif"],
         teko: ["Teko", "sans-serif"],
      },
   },
   plugins: [require("tailwind-scrollbar")],
};
