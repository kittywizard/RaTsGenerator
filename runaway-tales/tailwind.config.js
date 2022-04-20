module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': 'rgba(135,181,127,1)',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': 'rgba(50,50,50,0.8)',
      'gray-light': '#d3dce6',
    },
    fontFamily: {
      sans: ['Raleway', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [],
}
