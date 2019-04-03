const path = require('path');
module.exports = config => {
  config.set({
    singleRun: true,
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    },
    frameworks: ['mocha', 'sinon-chai', 'source-map-support', 'webpack'],
    files: [
      {
        pattern: 'node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js',
        watched: false,
      },
      {
        pattern: 'node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
        watched: false,
      },
      'test/unit/index.js',
    ],
    preprocessors: {
      'test/unit/index.js': ['webpack', 'sourcemap'],
    },
    reporters: ['dots', 'coverage-istanbul'],
    colors: true,
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text-summary'],
      dir: path.join(__dirname, 'coverage'),
      combineBrowserReports: true,
      skipFilesWithNoCoverage: true,
      fixWebpackSourcePaths: true,
      thresholds: {
        // Should be disabled soon
        emitWarning: true,
        global: {
          statements: 100,
          lines: 100,
          branches: 100,
          functions: 100,
        },
      },
    },
    client: {
      chai: {
        includeStack: true,
      },
    },
    webpack: {
      devtool: 'inline-source-map',
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'istanbul-instrumenter-loader',
            enforce: 'post',
            include: path.resolve('./packages'),
            exclude: /node_modules|test-helpers|\.test\.js$/,
            options: {
              esModules: true,
            },
          },
        ],
      },
    },
    webpackMiddleware: {
      stats: 'errors-only',
    },
    webpackServer: {
      noInfo: true,
    },
  });

  return config;
};
