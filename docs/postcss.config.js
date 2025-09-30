module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-nested': {},
    'postcss-preset-env': {
      features: {
        'custom-properties': false,
        'nesting-rules': true,
        'custom-media-queries': true,
        'media-query-ranges': true,
      },
      autoprefixer: {
        grid: true,
      },
    },
  }
};