/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#eee",

        secondary: {
          DEFAULT: "#663AE8",
          100: "#663AE0",
          200: "#663AFF",
        },
        black: {
          DEFAULT: "#595858",
          100: "#595900",
          200: "##59600",
        },
        green: { DEFAULT: "#40B818", 100: "#3EBEA8" },
        blue: { DEFAULT: "#3AA1D8", 100: "#3AA3AA" },
        purple: {
          DEFAULT: "#663AE8",
          100: "#4B2CAA",
        },
        red: { DEFAULT: "#f57d75" },
      },
      fontFamily: {
        pitalic: ["Inter-Light", "sans-serif"],
        pregular: ["Inter-Regular", "sans-serif"],
        pmedium: ["Inter-Medium", "sans-serif"],
        psemibold: ["Inter-SemiBold", "sans-serif"],
        pbold: ["Inter-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
