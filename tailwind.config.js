module.exports = {
  mode: 'jit',
  darkMode: 'class', // class, media, false
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        test: 'red',
      },
      boxShadow: {
        'outline-blue': '0 0 0 4px rgb(96 165 250 / 10%)',
        'outline-blue-dark': '0 0 0 4px rgb(96 165 250 / 15%)',
        'outline-danger': '0 0 0 4px rgb(255 0 0 / 10%)',
      },
    },
  },
  plugins: [],
  // content: {
  //   enabled: true,
  //   content: ['./src/**/*.{js,jsx,ts,tsx}'],
  //   options: {
  //     safelist: ['dark'], // specific classes
  //   },
  // },
}
