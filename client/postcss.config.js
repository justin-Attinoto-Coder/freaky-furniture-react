export default {
  plugins: [
    import('@tailwindcss/postcss').then(module => module.default),
    // other PostCSS plugins
  ]
};
