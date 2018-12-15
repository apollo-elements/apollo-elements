const createBaseConfig = require('@open-wc/testing-karma/create-karma-config');

module.exports = config => {
  const baseConfig = createBaseConfig(config);

  config.set({
    ...baseConfig,
    files: config.grep ? [config.grep] : [
      'classes/*.test.js',
      'elements/*.test.js',
      'lib/*.test.js',
      'mixins/*.test.js',
    ],
    exclude: ['test/*'],
  });
};
