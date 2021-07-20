---
"@apollo-elements/fast": major
"@apollo-elements/gluon": major
"@apollo-elements/haunted": major
"@apollo-elements/hybrids": major
"@apollo-elements/lit-apollo": major
"@apollo-elements/mixins": major
"@apollo-elements/polymer": major
---

Makes GraphQL script children opt-in

Removes the ability to read GraphQL documents (i.e. `query`, `mutation`, or `subscription`) and variables from the DOM via `<script type="application/graphql">` or json.

You can opt-back in to this behaviour by applying the `GraphQLScriptChildMixin` from `@apollo-elements/mixins`.

`<apollo-*>` components and the Polymer components all still have this facility. Be careful when accepting user-generated HTML, as it means users can make arbitrary queries by adding HTML to the document.

Read [the docs](https://apolloelements.dev/api/libraries/mixins/graphql-script-child-mixin/) for more info

Deprecates `@apollo-elements/lib` and `@apollo-elements/interfaces`

Removes the `lib` and `interfaces` packages, and moves their contents to `core`.

If you were for some reason importing these, update your imports.
