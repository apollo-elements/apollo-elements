---
name: lazy-resolvers
---

## Lazy-Loaded Type Policies

Only load type policy code for components that need them.

Decrease initial page load sizes to keep the UX snappy.

```typescript reveal
import { TypePoliciesMixin } from '@apollo-elements/mixins/type-policies-mixin';

@customElement('giant-feature')
class GiantFeature extends TypePoliciesMixin(ApolloQuery) {
  query = GiantFeatureQuery;

  typePolicies = {
    fields: {
      giant: {
        read() {/*...*/},
      },
    },
  };
}
```
