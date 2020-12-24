---
layout: api
package: '@apollo-elements/mixins'
module: './type-policies-mixin.js'
---

# Web Component Libraries >> Class Mixins >> TypePoliciesMixin

Optional mixin which lets you declare type policies for a component's query.

```js
import { ApolloQueryElement } from '@apollo-elements/interfaces';
import { TypePoliciesMixin } from '@apollo-elements/mixins/type-policies-mixin';

export class HelloQueryElement extends TypePoliciesMixin(ApolloQueryElement) {
  typePolicies = {
    Greeting: {
      fields: {
        name(next) { return next ?? 'friend'; },
        greeting(next) { return next ?? 'friend'; },
      },
    },
  }
}
```
