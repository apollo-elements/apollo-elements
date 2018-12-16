const createBaseConfig = require('@open-wc/testing-karma/create-karma-config');

module.exports = config => {
  const baseConfig = createBaseConfig(config);
  const files = config.grep ? [config.grep] : ['!(node_modules)/*.test.js'];
  const exclude = ['test/*'];
  config.set({ ...baseConfig, files, exclude });
};
