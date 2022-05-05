module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-dark' : '#1C1C1E',
        'text-main' : '#F2F2F7',
        'text-sec' : '#EBEBF5',
        'button-outline' : '#767680',
        'button-solid' : '#636366',
      }
    },
  },
  plugins: [],
}
