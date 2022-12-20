/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#E7FFE9",
          normal: "#A1FFC7",
          dark: "#81F8B1"
        },
        secondary: "#EBEBEB",
      },
    },
  },
  plugins: [],
};
