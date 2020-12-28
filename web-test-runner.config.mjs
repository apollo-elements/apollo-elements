// @ts-check
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';

import _commonjs from '@rollup/plugin-commonjs';
import _graphql from '@apollo-elements/rollup-plugin-graphql';
import _nodeResolve from '@rollup/plugin-node-resolve';

const graphql = fromRollup(_graphql);
const commonjs = fromRollup(_commonjs);
const nodeResolve = fromRollup(_nodeResolve);

const cjsIncludes = [
  '**/fast-json-stable-stringify/index.js',
  '**/graphql-tag/src/index.js',
  '**/zen-observable/**/*.js',
  '**/bind-decorator/index.js',
];

/** @type {import('@web/test-runner').TestRunnerConfig} */
const config = {
  nodeResolve: true,

  rootDir: '../..',

  files: [
    'packages/!(test-helpers)/**/*.test.ts',
  ],

  mimeTypes: {
    '**/*.graphql': 'js',
  },

  coverageConfig: {
    exclude: [
      'packages/**/*.test.{ts, js}',
      'packages/lib/cuid.{ts, js}',
      '**/test-helpers/**/*',
      '*__*-dev-server__*',
    ],
  },

  testRunnerHtml: testRunnerImport => `
    <html>
      <head>
      <script>
        // suppress advertising
        window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__ = () => void 0;
      </script>
      </head>
      <body>
        <script type="module">
          import '${testRunnerImport}';
        </script>
      </body>
    </html>
  `,


  plugins: [
    graphql(),
    commonjs({ include: cjsIncludes }),
    esbuildPlugin({ ts: true }),
    nodeResolve({
      exportConditions: ['default', 'esbuild', 'import'],
      extensions: ['.mjs', '.js', '.ts', '.css', '.graphql'],
    }),
  ],
};

export default config;
