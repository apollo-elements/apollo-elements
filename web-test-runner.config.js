// @ts-check
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';
import { sendKeysPlugin } from '@web/test-runner-commands/plugins';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';
import { stat } from 'fs/promises';

import _commonjs from '@rollup/plugin-commonjs';
import _graphql from '@rollup/plugin-graphql';

const graphql = fromRollup(_graphql);
const commonjs = fromRollup(_commonjs);

const cjsIncludes = [
  '**/fast-json-stable-stringify/index.js',
  '**/graphql-tag/src/index.js',
  '**/zen-observable/**/*.js',
  '**/incremental-dom/dist/*cjs.js',
];

const require = createRequire(import.meta.url);
const exists = (x) => stat(x).then(() => true, () => false);

/**
 * @param {string} source
 * @param {import("Koa").Context} context
 */
function tryToResolve(source, context) {
  let resolved = '';

  try {
    resolved = require.resolve(source);
  } catch (error) {
    const { message } = error;
    // try not to look
    if (message.startsWith('Cannot find module')) {
      const [, resolved] = /Cannot find module '(.*)'/.exec(message) || [];
      if (!resolved) {
        throw error;
      }
    } else {
      throw error;
    }
  }

  // e.g., a relative path from a file deeper in the module graph
  // `context.path` here is the abspath to the importee
  if (!resolved) {
    resolved = join(dirname(context.path), source);
  }

  return resolved;
}

/**
 * Resolves local monorepo package imports. Needed because we consume our own monorepo packages
 * @return {import('@web/dev-server-core').Plugin}
 */
function resolveLocalFilesFromTypeScriptSources() {
  const rootDir = fileURLToPath(new URL('.', import.meta.url));
  return {
    name: 'resolve-local-monorepo-packages-from-ts-sources',
    async transformImport({ source, context }) {
      const isNodeModule = source.match(/node_modules/) || context.path.match(/node_modules/);
      if (source.endsWith('.ts.js')) {
        // already resolved, but had `.js` appended, probably by export map
        return source.replace('.ts.js', isNodeModule ? '.js' : '.ts');
      } else if (isNodeModule) {
        // don't try to resolve node_modules, they're already resolved
        return;
      } else {
        const resolved = tryToResolve(source, context);
        const absToRoot = resolved.replace(rootDir, '/');
        const replaced = absToRoot.replace(/\.js$/, '.ts');
        const fileExists = await exists(join(rootDir, replaced));
        const final = (fileExists ? replaced : resolved);
        return final;
      }
    },
  };
}

/** @type {Partial<import('@web/test-runner').TestRunnerConfig>} */
export default ({
  nodeResolve: {
    extensions: ['.ts', '.mjs', '.js', '.css', '.graphql'],
  },

  rootDir: '../..',

  files: [
    'packages/!(create)/**/*.test.ts',
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
      '**/test/**/*',
      '*__*-dev-server__*',
    ],
  },

  testRunnerHtml: testRunnerImport => `
    <html>
      <head>
      <script>
        // @ts-ignore: https://github.com/graphql/graphql-js/pull/2409
        globalThis.process ??= { env: {} };
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
    resolveLocalFilesFromTypeScriptSources(),
    graphql(),
    commonjs({ include: cjsIncludes, ignoreDynamicRequires: false }),
    esbuildPlugin({ ts: true }),
    sendKeysPlugin(),
    {
      name: 'fake it for gluon',
      resolveImport({ source }) {
        if (source.endsWith('lit-html/lib/shady-render.js'))
          return '../../lit-html/lit-html.js';
      },
    },
  ],
});
