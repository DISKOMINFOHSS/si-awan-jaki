/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            'sans': ['Inter', ...defaultTheme.fontFamily.sans]
        },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

