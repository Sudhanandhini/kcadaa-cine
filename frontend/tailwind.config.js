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
          DEFAULT: '#005d9b',
          dark: '#005d9b',
        },
        accent: {
          DEFAULT: '#fecb05',
          dark: '#fecb05',
        },
      },
       fontFamily: {
    sans: ["Poppins", "sans-serif"],  // becomes default font
  },
    },
  },
  plugins: [],
}
