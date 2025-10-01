---
"@apollo-elements/core": major
"@apollo-elements/fast": major
"@apollo-elements/gluon": major
"@apollo-elements/polymer": major
"@apollo-elements/components": major
"@apollo-elements/lit-apollo": major
"@apollo-elements/mixins": major
---

**BREAKING CHANGE**: Removed `errors` array from subscriptions

Subscription controllers no longer maintain an `errors` array. Subscriptions now only use the `error` (singular) field, matching Apollo Client's `useSubscription` behavior.

**Before:**
```typescript
subscription.errors // readonly GraphQLFormattedError[]
```

**After:**
```typescript
subscription.error // Error | null
```

This change aligns apollo-elements subscriptions with Apollo Client v4's subscription API, where subscription results include only `error` (singular), not `errors` (plural).

**Migration:** If you were reading `subscription.errors`, use `subscription.error` instead.
