/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          rose: '#B76E79'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'ui-serif', 'Georgia', 'serif']
      },
      boxShadow: {
        glow: '0 10px 30px rgba(212, 175, 55, 0.25)'
      }
    }
  },
  plugins: [forms],
}
