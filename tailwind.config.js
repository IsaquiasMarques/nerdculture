/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'xs': '360px',
      'sm': '640px',
      'md': '768px',
      'md-905': '905px',
      'lg': '1024px',
      'xl-1230': '1230px',
      'xl': '1280px',
      '2xl': '1440px',
      '3xl': '1536px',
      '4xl': '1600px',
      '5xl': '1900px',
      'xl-1920': '1920px',
      '6xl': '2050px'
    },
    extend: {
      colors: {
        primary: '#00BAEE',
        secondary: '#0A042A',
        auxiliary: '#14498C',
        gray: '#555555',
      }
    },
  },
  plugins: [],
}