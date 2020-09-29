<meta name="description" content="How to use Apollo Elements with Rollup to build your GraphQL-based app for production"/>

Since Apollo client [cannot be imported directly into the browser](https://github.com/apollographql/apollo-client/issues/3047), you must transpile and bundle the in order to use it in your app. We recommend using [Rollup](https://rollupjs.com) for this. This is also a good opportunity to implement performance enhancements like minification and code splitting.

A basic `rollup.config.js` that you can work from looks like this:

```js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

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
  ]
}
```

You can use `rollup-plugin-lit-css` and `@apollo-elements/rollup-plugin-graphql` to enhance the <abbr title="developer experience">DX</abbr>:
```js
import litcss from 'rollup-plugin-lit-css';
import graphql from '@apollo-elements/rollup-plugin-graphql';
// ...

export default {
  //...
  plugins: [
    // ...,
    graphql(),
    litcss(),
  ]
}
```

These plugins let you import CSS and GraphQL files as JavaScript objects. With them, you can do fun tricks in your source modules:

```js
import { ApolloQuery, customElements } from '@apollo-elements/lit-apollo';
import HelloQuery from './Hello.query.graphql';
import style from './hello-query.css';

@customElement('hello-world')
class HelloWorld extends ApolloQuery {
  query = HelloQuery;

  static styles = style;
}
```

Alternatively, you might bundle and export your Apollo client separately, then import it into your browser-friendly component modules, perhaps using a tool like [snowpack](https://snowpack.dev)

## JavaScript Features
Apollo Elements generally targets modern browsers up to ECMAScript version 2019, with features like `Array#flatMap` and `Object#fromEntries`. If you need to support to older browsers, we recommend a polyfill, and possibly a compilation step.