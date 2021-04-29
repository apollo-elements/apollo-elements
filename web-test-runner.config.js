// @ts-check
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';
import { sendKeysPlugin } from '@web/test-runner-commands/plugins';

import _commonjs from '@rollup/plugin-commonjs';
import _graphql from '@apollo-elements/rollup-plugin-graphql';

const graphql = fromRollup(_graphql);
const commonjs = fromRollup(_commonjs);

const cjsIncludes = [
  '**/fast-json-stable-stringify/index.js',
  '**/graphql-tag/src/index.js',
  '**/zen-observable/**/*.js',
  '**/incremental-dom/dist/*cjs.js',
  '**/bind-decorator/index.js',
];

/** @type {import('@web/test-runner').TestRunnerConfig} */
const config = {
  nodeResolve: {
    exportConditions: ['default', 'esbuild', 'import'],
    extensions: ['.mjs', '.js', '.ts', '.css', '.graphql'],
  },

  rootDir: '../..',

  files: [
    'packages/!(test-helpers)/**/*.test.ts',
  ],

  mimeTypes: {
    '**/*.graphql': 'js',
  },

  coverageConfig: {
    exclude: [
      '_site/**/*',
      '_site-dev/**/*',
      '.vscode/**/*',
      '.netlify/**/*',
      'coverage/**/*',
      'packages/**/*.test.{ts, js}',
      'packages/lib/cuid.{ts, js}',
      '**/node_modules/**/*',
      '**/test-helpers/**/*',
      '*__*-dev-server__*',
    ],
  },

  testRunnerHtml: testRunnerImport => `
    <html>
      <head>
      <script>
        // @ts-ignore: https://github.com/graphql/graphql-js/pull/2409
        globalThis.process ??= { env: '' };
        // suppress advertising
        globalThis.__APOLLO_DEVTOOLS_GLOBAL_HOOK__ = () => void 0;
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
    commonjs({ include: cjsIncludes, ignoreDynamicRequires: false }),
    esbuildPlugin({ ts: true }),
    sendKeysPlugin(),
  ],
};

export default config;
