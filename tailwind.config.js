/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html",
  "./src/**/*.js", "./src/styles/**/*.css"],
  theme: {
    extend: {
      colors: {
      'custom-color-purple': '#B4B1D4', // Define your custom color here
      'custom-color-grey': '#585858',
      'custom-color-purple-hover': '#645BC1',
      'custom-color-purple-gradient': '#923B99',
    },
    fontFamily: {
      serif: ['Times New Roman', 'Times', 'serif'],
      roboto: ['Roboto', 'sans-serif'],
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover'],
    },
  },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

