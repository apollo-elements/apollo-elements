You can run your apollo-elements app without using a build step with the [web dev server](https://modern-web.dev/docs/dev-server/overview/).

This sample config lets you also import css and graphql into your lit-apollo components written in TypeScript:

```js
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';

import rollupCommonjs from '@rollup/plugin-commonjs';
import rollupLitcss from 'rollup-plugin-lit-css';
import rollupGraphql from 'rollup-plugin-graphql';

const litcss = fromRollup(rollupLitcss);
const graphql = fromRollup(rollupGraphQL);
const commonjs = fromRollup(rollupCommonjs);

/**
 * These files are imported directly into components
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

If you're using TypeScript and importing CSS and GraphQL files with the rollup plugins, make sure to add this declaration somewhere in a `.d.ts` file in your project:

```ts
declare module '*.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export default defaultDocument;
}

declare module '*.css' {
  import { CSSResult } from 'lit-element';
  const css: CSSResult;
  export default css;
}
```