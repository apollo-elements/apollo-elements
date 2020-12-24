---
description: How to use Apollo Elements with @web/dev-server to develop your GraphQL-based app without a build step.
---

# Getting Started >> Buildless Development || 20

You can run your apollo-elements app without using a build step with the [web dev server](https://modern-web.dev/docs/dev-server/overview/).

This sample config lets you also import css and graphql into your lit-apollo components written in TypeScript:

```js copy
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';

import rollupCommonjs from '@rollup/plugin-commonjs';
import rollupLitcss from 'rollup-plugin-lit-css';
import rollupGraphql from '@apollo-elements/rollup-plugin-graphql';

const litcss = fromRollup(rollupLitcss);
const graphql = fromRollup(rollupGraphQL);
const commonjs = fromRollup(rollupCommonjs);

/**
 * These are the CSS files you directly import into components
 * Transform these files into LitElement `CSSResult` modules
 */
const componentCSS =
  'src/components/**/*.css';

/**
 * These are the CSS files you load globally in `index.html`.
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

```ts copy
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

## Recommended Optimizations
Apply these plugins to further reduce your bundle sizes.

- [rollup-plugin-terser](https://npm.im/rollup-plugin-terser)
- [rollup-plugin-minify-html-literals](https://npm.im/rollup-plugin-minify-html-literals)
- [@open-wc/rollup-plugin-html](https://npm.im/@open-wc/rollup-plugin-html)
