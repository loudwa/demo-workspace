/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a2e',
        secondary: '#ff7700',
        gray: '#808080',
        green: '#00ff00',
        red: '#ff0000',
        white: '#ffffff',
      },
      fontFamily: {
        pixel: ['Press Start 2P', 'cursive'],
      },
    },
  },
  plugins: [],
}