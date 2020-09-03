You can run your apollo-elements app without using a build step with the [web dev server](https://modern-web.dev/docs/dev-server/overview/).

This sample config lets you also import css and graphql into your lit-apollo components:

```js
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';
import rollupCommonjs from '@rollup/plugin-commonjs';

import rollupLitcss from 'rollup-plugin-lit-css';
import rollupLitcss from 'rollup-plugin-graphql';

const commonjs = fromRollup(rollupCommonjs);

const litcss = fromRollup(rollupLitcss.default);

const graphql = fromRollup(graphql.default);

/**
 * These files are imported directly into components
 *
 * @example
 * ```js
 * import style from './component-style.css';
 * ```
 *
 * Transform these files into LitElement `CSSResult` modules
 */
const componentCSS =
  'src/components/**/*.css';

/**
 * These files are loaded in `index.html`.
 * Serve these as regular stylesheets
 */
const globalCSS =
  'examples/spacex/style.css';

export default {
  nodeResolve: true,
  watch: true,
  rootDir: '.',
  port: 8090,
  appIndex: 'src/index.html',
  mimeTypes: {
    'src/components/**/*.css': 'js',
    'src/**/*.graphql': 'js',
  },
  plugins: [
    litcss({ include: componentCSS, exclude: globalCSS }),
    graphql(),
    commonjs(),
    esbuildPlugin({ ts: true }),
  ],
};
```