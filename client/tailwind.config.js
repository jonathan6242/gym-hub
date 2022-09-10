/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'rgb(40,40,40)',
        'secondary': 'rgb(102,106,110)',
        'background': 'rgb(241,241,241)',
        'accent': 'rgb(255,120,3)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ]
}