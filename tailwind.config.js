/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./dist/*.html', './src/*.js'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Quicksand'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
