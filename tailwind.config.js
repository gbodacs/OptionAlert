module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",'node_modules/daisyui/dist/**/*.js', 'node_modules/react-daisyui/dist/**/*.js'
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      }
    }
  },
  plugins: [require('daisyui')],
}
