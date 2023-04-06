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
      'grey-middle': '#8E949F',
    },
    textColor: {
      main: '#91D3C8',
      white: '#FFFFFF',
      black: '#000000',
      red: '#DF6B5A',
      blue: '#364BB3',
      'dark-grey': '#606060',
      'grey-middle': '#8E949F',
    },
    gradientColorStops: {
      'blue-start': '#00628B',
      'blue-end': '#017797',
    },
    extend: {
      padding: {
        18: '4.5rem',
      },
      minHeight: {
        list: 'calc(100vh - 70px)',
      },
      objectPosition: {
        'center-7/10': 'center 70%',
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          primary: '#91D3C8',
          secondary: '#FAFAFA',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
