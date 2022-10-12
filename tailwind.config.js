/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
        arabic: ["Scheherazade New"],
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};
