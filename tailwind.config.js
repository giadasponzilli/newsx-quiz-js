/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html",
  "./src/**/*.js", "./src/styles/**/*.css"],
  theme: {
    extend: {
      colors: {
      'custom-color-purple': '#B4B1D4', // Define your custom color here
    },
  },
  },
  plugins: [],
}

