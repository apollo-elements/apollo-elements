Since Apollo client [cannot be imported directly into the browser](https://github.com/apollographql/apollo-client/issues/3047), you must transpile and bundle the in order to use it in your app. We recommend using [Rollup](https://rollupjs.com) for this. This is also a good opportunity to implement performance enhancements like minification and code splitting.

Your `rollup.config.js` might look something like this:

```js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import litcss from 'rollup-plugin-lit-css';
import graphql from '@kocal/rollup-plugin-graphql';

export default {
  // main entry point which loads the client and the app-shell components
  input: 'main.js',

  output: [{
    dir: 'build',
    format: 'es',
    sourcemap: true,
  }, {
    dir: 'build/nomodule',
    format: 'system',
    sourcemap: true,
  }],

  plugins: [
    resolve(),
    commonjs(),
    graphql(),
    litcss(),
  ]
}
```

Alternatively, you might bundle and export your Apollo client separately, then import it into your browser-friendly component modules, perhaps using a tool like [snowpack](https://snowpack.dev)

## JavaScript Features
Apollo Elements generally targets modern browsers up to ECMAScript version 2019, with features like `Array#flatMap` and `Object#fromEntries`. If you need to support to older browsers, we recommend a polyfill, and possibly a compilation step.