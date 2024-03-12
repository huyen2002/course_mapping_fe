/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary_color: '#4B9BDB',
        primary_color_hover: '#3D8BCC',
        white_hover: '#F5F5F5',
        text_color: '#4F4F4F',
        text_color_hover: '#333333',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [require('flowbite/plugin')({})],
}
