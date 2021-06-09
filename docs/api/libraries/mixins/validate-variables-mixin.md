---
layout: layout-api
package: '@apollo-elements/mixins'
module: 'validate-variables-mixin.js'
---

# Web Component Libraries >> Class Mixins >> ValidateVariablesMixin

Optional mixin which prevents queries from automatically subscribing until their non-nullable variables are defined.

```js
import { ApolloQueryElement } from '@apollo-elements/interfaces';
import { ValidateVariablesMixin } from '@apollo-elements/mixins/validate-variables-mixin';
import { gql } from '@apollo/client/core';

export class ValidatedQueryElement extends ValidateVariablesMixin(ApolloQueryElement) {
  query = gql`
    query UsersByName($name: String!) {
      user { id name }
    }
  `;
}
```
