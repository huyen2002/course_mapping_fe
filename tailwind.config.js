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
        text_color: '#313131',
        text_color_hover: '#1d1c1c',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [require('flowbite/plugin')({})],
}
