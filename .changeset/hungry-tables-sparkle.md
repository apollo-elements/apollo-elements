---
"@apollo-elements/fast": major
---

Implements Apollo Behaviors for FASTElement

Behaviors are reusable pieces of code that you can share between FAST elements. Like the core controllers they are stackable and reusable, and let you add multiple operations to a single element.

This release adds `ApolloQueryBehavior`, `ApolloMutationBehavior`, and `ApolloSubscriptionBehavior`. [See the docs](https://next.apolloelements.dev/api/libraries/fast/) for usage examples and API docs.

The previous single-operation base classes are still available, but they have moved to `/bases/`.

**OLD**:
```js
import { ApolloQuery } from '@apollo-elements/fast/apollo-query';
```

**NEW**:
```js
import { ApolloQuery } from '@apollo-elements/fast/bases/apollo-query';
```

If you previously imported from `@apollo-elements/fast`, you can continue to do so. We recommend moving your code to behaviours though as a later version may remove the base classes.
