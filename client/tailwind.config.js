import {
  fontFamily,
  screens,
  typography,
  backgroundColor,
  zIndex,
  colors,
  boxShadow,
} from './src/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily,
      screens,
      fontSize: typography,
      backgroundColor,
      zIndex,
      colors,
      boxShadow,
    },
  },

  plugins: [],
}
