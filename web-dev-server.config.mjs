import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';
import rollupGraphql from '@kocal/rollup-plugin-graphql';
import rollupCommonjs from '@rollup/plugin-commonjs';

import rollupLitcss from 'rollup-plugin-lit-css';

const commonjs = fromRollup(rollupCommonjs);

const litcss = fromRollup(rollupLitcss.default);
const graphql = fromRollup(rollupGraphql);

export default {
  nodeResolve: true,
  watch: true,
  rootDir: '.',
  port: 8090,
  appIndex: 'examples/spacex/index.html',
  mimeTypes: {
    'examples/spacex/components/**/*.css': 'js',
    'examples/spacex/style.css': 'css',
  },
  plugins: [
    esbuildPlugin({ ts: true }),
    commonjs(),
    graphql(),
    litcss({
      include: 'examples/spacex/components/**/*.css',
      exclude: 'examples/spacex/style.css',
    }),
  ],
};
