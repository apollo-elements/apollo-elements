---
title: "From Apollo Client 3.0"
weight: 30
sidebar: guides
---

Apollo Elements 4 updates to Apollo Client 4 and includes one breaking change to subscriptions. This guide will help you migrate your app from Apollo Elements 3 to 4.

## Apollo Elements Breaking Changes

### Subscription Error Handling

**This is the main breaking change in Apollo Elements 4.** Subscription controllers no longer maintain an `errors` (plural) array. Subscriptions now only use the `error` (singular) field, matching Apollo Client's `useSubscription` behavior.

**Before (Apollo Elements 3):**
```typescript
class MyElement extends LitElement {
  subscription = new ApolloSubscriptionController(this, MessageSubscription);

  render() {
    // ❌ No longer available
    if (this.subscription.errors?.length) {
      return html`<p>Errors: ${this.subscription.errors.map(e => e.message).join(', ')}</p>`;
    }
    return html`<p>${this.subscription.data?.message}</p>`;
  }
}
```

**After (Apollo Elements 4):**
```typescript
class MyElement extends LitElement {
  subscription = new ApolloSubscriptionController(this, MessageSubscription);

  render() {
    // ✅ Use singular error instead
    if (this.subscription.error) {
      return html`<p>Error: ${this.subscription.error.message}</p>`;
    }
    return html`<p>${this.subscription.data?.message}</p>`;
  }
}
```

**Migration:** If you're reading `subscription.errors`, replace it with `subscription.error`.

## Environment Requirements

### Node.js 24

Apollo Elements 4 requires Node.js 24 or higher (previously 18.x):

```bash
node --version  # Should be 24.x or higher
```

### TypeScript 4.7

If you use TypeScript, you'll need version 4.7 or higher:

```bash
npm install --save-dev typescript@^4.7.0
```

## Apollo Client 4 Dependency

Apollo Elements 4 depends on Apollo Client 4. Update your dependency:

```bash
npm install @apollo/client@^4.0.6
```

Most Apollo Client 4 changes are internal and won't affect Apollo Elements users. However, if you use the cache API directly, note these changes:

### Removed `InMemoryCache.writeData`

The deprecated `writeData` method has been removed. Use `writeQuery`, `writeFragment`, or `cache.modify` instead:

**Before:**
```typescript
cache.writeData({
  data: { user: { id: "1", name: "Alice" } },
});
```

**After:**
```typescript
cache.writeQuery({
  query: gql`
    query GetUser {
      user {
        id
        name
      }
    }
  `,
  data: { user: { id: "1", name: "Alice" } },
});
```

## Migration Checklist

1. ✅ **Update Node.js** to version 24.x or higher
2. ✅ **Update TypeScript** (if used) to version 4.7 or higher
3. ✅ **Install Apollo Client 4**: `npm install @apollo/client@^4.0.6`
4. ✅ **Update Apollo Elements packages** to version 4.x
5. ✅ **Search for `subscription.errors`** in your codebase and replace with `subscription.error`
6. ✅ **If using `cache.writeData`**, replace with `writeQuery`, `writeFragment`, or `cache.modify`
7. ✅ **Run your tests** to verify everything works

## Need Help?

If you encounter issues migrating:
- Check the [Apollo Client 4 migration guide](https://www.apollographql.com/docs/react/migration/3.x-to-4.x)
- [Open an issue](https://github.com/apollo-elements/apollo-elements/issues/new) on GitHub
