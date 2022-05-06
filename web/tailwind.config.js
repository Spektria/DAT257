module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary' : '#1C1C1E',
        'light-primary' : '#F2F2F7',
        'light-secondary' : '#EBEBF5',
        'button-outline' : '#767680',
        'button-solid' : '#636366',
      }
    },
  },
  plugins: [],
}
