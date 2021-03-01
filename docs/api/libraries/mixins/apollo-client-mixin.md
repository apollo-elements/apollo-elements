---
layout: layout-api
package: '@apollo-elements/mixins'
module: './apollo-client-mixin.js'
---

# Web Component Libraries >> Class Mixins >> ApolloClientMixin

Mixin which associates an ApolloClient instance with a custom element class.

```js
import { ApolloQueryElement } from '@apollo-elements/interfaces';
import { ApolloClientMixin } from '@apollo-elements/mixins/apollo-client-mixin';
import { createApolloClient } from '@apollo-elements/lib/create-apollo-client';

const client = createApolloClient({ uri: '/graphql' });

export class WithClientElement extends
  ApolloClientMixin(ApolloQueryElement, client) { }
```
