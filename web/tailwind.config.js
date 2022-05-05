module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-pink' : '#fd3153',
        'background-dark' : '#1C1C1E',
        'text-main' : '#F2F2F7',
        'text-sec' : '#EBEBF5',
        'box-background' : '#767680',
      }
    },
  },
  plugins: [],
}
