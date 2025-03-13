const tailwindcss = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: {
    '@tailwindcss/postcss7-compat': {},
    autoprefixer: {},
  },
};