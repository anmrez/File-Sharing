/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {

      colors: {

        'main': '#191919',
        'main2': '#141414',
        'Omain2': '#141414aa',
        'main3': '#242424',

        'pink': '#DA0038',
        'Opink': '#DA003833',
        'pink-dark': '#990026',

        'red': '#ff0000',
        'Ored': '#ff000066',
        'redAlert': '#7d1a1acc',

        'greenAlert': '#16661ecc',
        

      },

      dropShadow: {
        'pink': '0px 0px 3px rgba(218, 0, 56, 1)',

        // drop-shadow( 1px 1px 3px rgb(255, 0, 0))
      }

    },
  },
  plugins: [],
}