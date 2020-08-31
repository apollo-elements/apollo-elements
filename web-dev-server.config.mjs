// @ts-check
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';
import graphql from 'es-dev-server-import-graphql';
import rollupCommonjs from '@rollup/plugin-commonjs';

import rollupLitcss from 'rollup-plugin-lit-css';

const commonjs = fromRollup(rollupCommonjs);

const litcss = fromRollup(rollupLitcss.default);

const includeCSS = [
  'docs/examples/spacex/components/**/*.css',
];

const excludeCSS = [
  'docs/examples/spacex/style.css',
];

export default {
  nodeResolve: true,
  watch: true,
  rootDir: '.',
  port: 8090,
  appIndex: './docs/examples/spacex/index.html',
  mimeTypes: {
    'docs/examples/spacex/components/**/*.css': 'js',
  },
  plugins: [
    litcss({ include: includeCSS, exclude: excludeCSS }),
    graphql(),
    commonjs(),
    esbuildPlugin({ ts: true }),
  ],
};
