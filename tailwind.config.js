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
          DEFAULT: '#7A3D11', // Darker SaddleBrown for better contrast with Gold
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
        gray: {
          400: '#737373', // Darker gray for contrast
          500: '#525252',
          600: '#404040',
        }
      },
      fontFamily: {
        hindi: ['"Noto Sans Devanagari"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
