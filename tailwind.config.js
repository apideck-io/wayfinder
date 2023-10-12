/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './node_modules/@apideck/components/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'basier-circle': ['Basier Circle', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        gray: colors.slate,
        primary: {
          50: '#f6f7fe',
          100: '#f2f3fd',
          200: '#e0e1fa',
          300: '#c9c8f4',
          400: '#aba4ea',
          500: '#9182de',
          600: '#775ad8',
          700: '#6434d5',
          800: '#5922b9',
          900: '#5a1aa8'
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '15px': '0.9375rem',
        '23px': '1.4375rem',
        'full': '100%'
      },
      maxWidth: {
        '4.5xl': '60rem',
        '8xl': '92rem'
      },
      maxHeight: {
        100: '30rem'
      }
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      '2lg': '1160px',
      'xl': '1280px',
      '1.5xl': '1400px',
      '2xl': '1536px',
      ...defaultTheme.screens
    }
  },
  important: '.apideck',
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
}
