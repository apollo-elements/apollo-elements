---
layout: layout-api
package: '@apollo-elements/core'
module: 'decorators.js'
description: Property Decorators for Apollo Elements
---
# Core >> Helpers >> Decorators || 50

Decorators for Apollo Elements. Used internally to reflect properties from controllers to their elements. Normally you shouldn't need to import these directly.

```ts
import { controlled } from '@apollo-elements/core/decorators';

class ControlledData<D extends MaybeTDN, V = MaybeVariables<D>> extends LitElement {
  controller = new ApolloQueryController<D, V>(this);

  @controlled()
  @state()
  data: Data<D> | null = null;
}
```
