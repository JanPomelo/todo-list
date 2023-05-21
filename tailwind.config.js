/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html", "./src/*.js"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Gaegu"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
