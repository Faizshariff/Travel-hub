// debug-twcss/tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    './public/components/**/*.tsx',
  ],
   plugins: [
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
],
   theme: {
   extend: {},
  }
 }