/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin'
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
    './node_modules/react-tailwindcss-select/dist/index.esm.js',
  ],
  theme: {
    extend: {
      colors: {
        primary_color: '#4B9BDB',
        primary_color_hover: '#3D8BCC',
        white_hover: '#F5F5F5',
        text_color: '#313131',
        text_color_hover: '#1d1c1c',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [flowbitePlugin],
}
