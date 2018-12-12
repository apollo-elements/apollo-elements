const createBaseConfig = require('@open-wc/testing-karma/create-karma-config');

module.exports = config => {
  const baseConfig = createBaseConfig(config);

  config.set({
    ...baseConfig,

    files: [
      // if --grep flag is set, run those tests instead
      config.grep ? config.grep : '**/*.mocha.test.js',
    ],

  });
};
