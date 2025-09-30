---
layout: "layout-api"
package: "mixins"
module: "type-policies-mixin.js"
sidebar: api
---

<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->

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
