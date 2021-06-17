# @apollo-elements/lit-apollo

## 4.0.0-next.0
### Major Changes

- bc48777f: Updates to `lit` npm package.
  
  To migrate,
  
  ```bash
  npm r -S lit-element lit-html
  npm i -S @apollo-elements/lit-apollo@next
  ```
  
  ```bash
  yarn remove lit-element lit-html
  yarn add @apollo-elements/lit-apollo@next
  ```
- b5f2502f: Makes GraphQL script children opt-in
  
  Removes the ability to read GraphQL documents (i.e. `query`, `mutation`, or `subscription`) and variables from the DOM via `<script type="application/graphql">` or json.
  
  You can opt-back in to this behaviour by applying the `GraphQLScriptChildMixin` from `@apollo-elements/mixins`.
  
  `<apollo-*>` components all still have this facility. Be careful when accepting user-generated HTML, as it means users can make arbitrary queries by adding HTML to the document.
  
  Read [the docs](https://apolloelements.dev/api/libraries/mixins/graphql-script-child-mixin/) for more info
  
  Deprecates `@apollo-elements/lib` and `@apollo-elements/interfaces`
  
  Removes the `lib` and `interfaces` packages, and moves their contents to `core`.
  
  If you were for some reason importing these, update your imports.
