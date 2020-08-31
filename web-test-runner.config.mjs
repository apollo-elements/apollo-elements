// @ts-check
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';
import graphql from 'es-dev-server-import-graphql';
import rollupCommonjs from '@rollup/plugin-commonjs';

const commonjs = fromRollup(rollupCommonjs);

const cjsIncludes = [
  '**/crocks/**/*.js',
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
    esbuildPlugin({ ts: true }),
    graphql(),
    commonjs({ include: cjsIncludes }),
  ],
};
