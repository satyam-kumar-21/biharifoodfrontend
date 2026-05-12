/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B4513', // SaddleBrown (Warm Indian sweets color)
          light: '#A0522D',
          dark: '#5D2E0C',
        },
        secondary: {
          DEFAULT: '#FFD700', // Gold
          light: '#FFEC8B',
          dark: '#B8860B',
        },
        accent: {
          DEFAULT: '#E2725B', // Terra Cotta
          light: '#F4A460',
          dark: '#CD5C5C',
        },
        background: '#FDF5E6', // OldLace (Creamy background)
      },
      fontFamily: {
        hindi: ['"Noto Sans Devanagari"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
