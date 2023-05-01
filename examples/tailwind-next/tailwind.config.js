const mirrorful = require('./.mirrorful/theme_cjs.cjs')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: mirrorful.Tokens.colors,
      fontSize: mirrorful.Tokens.fontSizes,
    },
  },
  plugins: [],
}
