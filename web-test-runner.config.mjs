// @ts-check
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';

import _commonjs from '@rollup/plugin-commonjs';
import _graphql from '@apollo-elements/rollup-plugin-graphql';

// @ts-ignore: graphql plugin doesn't supply sourcemaps
const graphql = fromRollup(_graphql);
const commonjs = fromRollup(_commonjs);

const cjsIncludes = [
  '**/fast-json-stable-stringify/index.js',
  '**/graphql-tag/src/index.js',
  '**/zen-observable/**/*.js',
  '**/bind-decorator/index.js',
];

export default {
  nodeResolve: true,

  rootDir: '../..',

  files: [
    'packages/**/*.test.ts',
  ],

  mimeTypes: {
    '**/*.graphql': 'js',
  },

  coverageConfig: {
    exclude: [
      'packages/**/*.test.ts',
      'packages/**/*.test.js',
      '**/test-helpers/*',
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
  ],
};
