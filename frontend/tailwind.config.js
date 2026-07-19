/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#EC0F8C',
          pink: '#EC0F8C',
          dark: '#0B0B0C',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'Helvetica Neue',
          'Hiragino Kaku Gothic ProN',
          'Noto Sans JP',
          'Arial',
          'sans-serif',
        ],
      },
      maxWidth: {
        content: '1120px',
      },
    },
  },
  plugins: [],
};
