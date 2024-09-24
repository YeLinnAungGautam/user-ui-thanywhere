/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    colors: {
      main: "#FF5B00",
      yellow: "#fcaa05",
      white: "#FFFFFF",
      black: "#000000",
      green: "#28AF00",
      red: "#CD1C00",
      gray: "#EEEEEE",
      background: "#FCFBFB",
    },
  },
  plugins: [],
};
