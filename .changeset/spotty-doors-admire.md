---
"@apollo-elements/fast": major
"@apollo-elements/gluon": major
"@apollo-elements/haunted": major
"@apollo-elements/hybrids": major
"@apollo-elements/interfaces": major
"@apollo-elements/lit-apollo": major
"@apollo-elements/mixins": major
"@apollo-elements/polymer": major
---

Removes the ability to read GraphQL documents (i.e. `query`, `mutation`, or `subscription`) and variables from the DOM via `<script type="application/graphql">` or json.

You can opt-back in to this behaviour by applying the `GraphQLScriptChildMixin` from `@apollo-elements/mixins`.

`<apollo-*>` components all still have this facility. Be careful when accepting user-generated HTML, as it means users can make arbitrary queries by adding HTML to the document.

See https://apolloelements.dev/api/libraries/mixins/graphql-script-child-mixin/ for more info
