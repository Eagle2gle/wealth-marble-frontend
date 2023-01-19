/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      main: '#91D3C8',
      red: '#DF6B5A',
      blue: '#364BB3',
      grey: '#EAEAEA',
      tab: '#FAFAFA',
      sell: '#F3F8FE',
      buy: '#FDF3F4',
      black: '#000000',
      'dark-grey': '#606060',
      'main-light': '#E1EEE8',
      white: '#ffffff',
    },
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          primary: '#91D3C8',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
