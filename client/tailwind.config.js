/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '1.5xl': '1.4rem',
        '2.5xl': '1.7rem'
      },
      colors: {
        cyan: '#00E5FF',
      },
    },
  },
  plugins: [],
}

