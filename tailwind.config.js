/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'babas-neue': "'Bebas Neue', sans-serif",
        montserrat: "'Montserrat', sans-serif",
      },
      backgroundImage: {
        'main-bg': "url('./src/assets/images/background.png')",
      },
    },
  },
  plugins: [],
};
