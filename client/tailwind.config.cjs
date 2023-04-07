/** @type {import('tailwindcss').Config} */
//eslint-disable-next-line
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  }, //eslint-disable-next-line
  plugins: [require("daisyui")],
};
