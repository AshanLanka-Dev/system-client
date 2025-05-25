/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#01818E',
        primaryHover: '#016d77',
        // primary: '#8e5601',
        // primaryHover: '#774401',
        secondary: '#000000',
        background: '#F6F6F6',
        // background: '#ffffff',
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"]
      },
    },
  },
  plugins: [],
};