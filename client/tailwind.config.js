export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        spinIn: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(180deg)' },
        },
        spinOut: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(720deg)' },
        },
        dropdown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        dropup: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-20px)' },
        },
      },
      animation: {
        spinIn: 'spinIn 0.5s forwards',
        spinOut: 'spinOut 0.5s forwards',
        dropdown: 'dropdown 0.5s forwards',
        dropup: 'dropup 0.5s forwards',
      },
      screens: {
        'xs': '480px', // Custom breakpoint at 480px
      },
    },
  },
  plugins: [],
};