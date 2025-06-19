import colors from 'tailwindcss/colors'

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.blue[600],
        primaryDark: colors.blue[800],
        accent: colors.indigo[500],
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
