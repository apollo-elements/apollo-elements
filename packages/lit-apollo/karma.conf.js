const defaultSettings = require('@open-wc/testing-karma/default-settings.js');
const merge = require('webpack-merge');

module.exports = config => {
  const files = config.grep ? [config.grep] : ['./*.test.js'];
  config.set(merge(defaultSettings(config), { files }));
  return config;
};
