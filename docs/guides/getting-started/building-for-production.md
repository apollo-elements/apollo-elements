---
description: How to use Apollo Elements with Rollup to build your GraphQL-based app for production
---

# Getting Started >> Building for Production || 30

Since [you can't import Apollo client directly into the browser](https://github.com/apollographql/apollo-client/issues/3047), you'll need transpile and bundle the `@apollo/client/core` package to use it in your app. We recommend using [Rollup](https://rollupjs.com) for this. While you're at it, you can also take some time to add performance enhancements like minification and code splitting to your rollup config.

A basic `rollup.config.js` that you can work from looks like this:

```js copy
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

You can use `rollup-plugin-lit-css` and `@rollup/plugin-graphql` to enhance the <abbr title="developer experience">DX</abbr>:

```js copy
import litcss from 'rollup-plugin-lit-css';
import graphql from '@rollup/plugin-graphql';
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

These plugins let you import CSS tagged-template literals and GraphQL files as JavaScript objects. With them, you can do fun tricks in your source modules:

<code-tabs collection="libraries" default-tab="lit">

  ```html tab html
  <p>
    These techniques are less relevant to HTML components,
    so check out the other tabs.
  </p>
  ```

  ```ts tab mixins
  import { HelloQuery } from './Hello.query.graphql';
  import style from './hello-query.css';

  class HelloWorld extends ApolloQuery {
    query = HelloQuery;

    static get styles() {
      return style;
    }
  }

  customElements.define('hello-world', HelloWorld);
  ```

  ```ts tab lit
  import { ApolloQueryController } from '@apollo-elements/core';
  import { LitElement } from 'lit';
  import { customElement } from 'lit/decorators.js';
  import { HelloQuery } from './Hello.query.graphql';
  import style from './hello-query.css';

  @customElement('hello-world')
  class HelloWorld extends ApolloQuery {
    query = new ApolloQueryController(this, HelloQuery);

    static styles = style;
  }
  ```

  ```ts tab fast
  import { FASTElement, customElement } from '@microsoft/fast-element';
  import { ApolloQueryBehavior } from '@apollo-elements/fast';
  import { HelloQuery } from './Hello.query.graphql';

  @customElement({ name: 'hello-world' })
  class HelloWorld extends FASTElement {
    query = new ApolloQueryBehavior(this, HelloQuery);
  }
  ```

  ```ts tab haunted
  import { useQuery, component, html } from '@apollo-elements/haunted';
  import { HelloQuery } from './Hello.query.graphql';

  function HelloWorld() {
    const { data } = useQuery(HelloQuery);
  }

  customElements.define('hello-world', component(HelloWorld));
  ```

  ```ts tab hybrids
  import { define, query } from '@apollo-elements/hybrids';
  import { HelloQuery } from './Hello.query.graphql';

  define('hello-world', {
    query: query(HelloQuery),
  });
  ```

</code-tabs>

To avoid build steps altogether, bundle and export your Apollo client separately, then import it into your browser-friendly component modules, perhaps using a tool like [snowpack](https://snowpack.dev)

## JavaScript Features
Apollo Elements generally targets modern browsers up to ECMAScript version 2019, with features like `Array#flatMap` and `Object#fromEntries`. If you need to support to older browsers, we recommend a polyfill, and possibly a compilation step.
