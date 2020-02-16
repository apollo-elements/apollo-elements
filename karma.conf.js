const { createDefaultConfig } = require('@open-wc/testing-karma');
const { wrapRollupPlugin: wrap } = require('es-dev-server-rollup');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const merge = require('deepmerge');

const exclude = [
  'node_modules/mocha/*',
];

/** @type {import('karma').Config['files']} */
const files = [
  { pattern: 'packages/**/*.test.js', type: 'module', watched: false },
  { pattern: 'packages/test-helpers/*.graphql', type: 'module' },
];

const graphql = require('es-dev-server-import-graphql');

/** @type {import('karma').Config['esm']} */
const esm = {
  coverageExclude: [
    'packages/**/*.test.ts',
    'packages/**/*.test.js',
    '**/test-helpers/*',
    '*__es-dev-server__*',
  ],
  plugins: [
    graphql({ include: 'packages/test-helpers/*.graphql' }),
    wrap(nodeResolve()),
    wrap(commonjs({ exclude, include: [
      'node_modules/crocks/**/*',
      'node_modules/graphql-tag/**/*',
      'node_modules/bind-decorator/**/*',
      'node_modules/bind-decorator/**/*',
      'node_modules/fast-json-stable-stringify/index.js',
      'node_modules/zen-observable/**/*',
    ] })),
  ],
};

module.exports = config => {
  config.set(merge(createDefaultConfig(config), { esm, files }));
  return config;
};
