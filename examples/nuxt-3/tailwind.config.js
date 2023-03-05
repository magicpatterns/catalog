/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    colors: {
      'brand': 'var(--color-brand)',
      'secondary': 'var(--color-secondary)',
      'primary': 'var(--color-primary)',
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif']
    },
    plugins: [],
  }
}
