/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      'sans': ['Poppins', 'sans-serif']
    },
    extend: {
      boxShadow: {
        'sharp-indigo': '5px 5px 0px 0px rgba(123, 142, 219)',
        'sharp-purple': '5px 5px 0px 0px rgba(140, 79, 201)',
        'sharp-indigo2': '5px 5px 0px 0px rgba(99, 110, 219)',
        'sharp-pink': '5px 5px 0px 0px rgba(217, 82, 153)',
        'sharp-rose': '5px 5px 0px 0px rgba(204, 65, 86)',
        'sharp-rose2': '5px 5px 0px 0px rgba(214, 107, 120)'
      }
    },
    screens: {
      'xs': '375px',
      ...defaultTheme.screens
    }
  },
  plugins: [],
}

