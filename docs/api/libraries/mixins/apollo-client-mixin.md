---
layout: sidebar.webc # layout-api
package: '@apollo-elements/mixins'
module: apollo-client-mixin.js
title: ApolloClientMixin
---
<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->

Mixin which associates an `ApolloClient` instance with a custom element class.

See [Usage: Apollo Client](/guides/usage/apollo-client/) for examples and alternatives.

```js
import { ApolloQueryElement } from '@apollo-elements/interfaces';
import { ApolloClientMixin } from '@apollo-elements/mixins/apollo-client-mixin';
import { createApolloClient } from '@apollo-elements/core/lib/create-apollo-client';

const client = createApolloClient({ uri: '/graphql' });

export class WithClientElement extends
  ApolloClientMixin(ApolloQueryElement, client) { }
```
