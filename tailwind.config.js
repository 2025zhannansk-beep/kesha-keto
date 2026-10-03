/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: { 50: '#FDFBF7', 100: '#F9F5ED' },
        sage: { 400: '#4ade80', 500: '#22c55e' },
        peach: { 100: '#FFEDD5', 200: '#FED7AA' },
        warm: { 500: '#78716C', 700: '#44403C', 800: '#292524' },
      },
      borderRadius: { '2xl': '1rem', '3xl': '1.5rem' },
      fontFamily: { sans: ['Nunito', 'sans-serif'] },
    },
  },
  plugins: [],
}
