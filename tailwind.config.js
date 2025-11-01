/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#211832',
        'secondary-dark': '#181C14',
        'accent-dark': '#1B1A55',
        'primary-red': '#9B3922',
        'accent-red': '#C62300',
      }
    },
  },
  plugins: [],
};
