---
title: "From Apollo Client 3.0"
weight: 30
sidebar: guides
---

Apollo Client 4 and Apollo Elements 4 bring important updates and improvements. When upgrading your app to `@apollo-elements` 4, follow these steps:

## Install Apollo Client 4

Update your dependencies to use Apollo Client 4:

```bash
npm install @apollo/client@^4.0.0
```

## Breaking Changes

### Node.js Compatibility

Apollo Client 4 requires Node.js 24 or higher. If you're using an older version of Node.js, update to at least version 24:

```bash
node --version  # Should be 24.x or higher
```

### TypeScript Compatibility

Apollo Client 4 requires TypeScript 4.7 or higher. Update your TypeScript version if needed:

```bash
npm install --save-dev typescript@^4.7.0
```

### Removed Deprecated APIs

Apollo Client 4 removes several previously deprecated APIs:

- `InMemoryCache.writeData` - use `writeQuery`, `writeFragment`, or `cache.modify` instead
- `ObservableQuery.setOptions` - use `ObservableQuery.reobserve` instead
- `useLazyQuery` in `@apollo/client/react` - this doesn't affect Apollo Elements

### Updated Error Handling

Error handling has been improved in Apollo Client 4. Network errors and GraphQL errors are now handled more consistently:

```ts
const { data, error, errors } = await client.query({ query });

if (error) {
  // Network error or single GraphQL error
  console.error(error);
}

if (errors) {
  // Multiple GraphQL errors
  console.error(errors);
}
```

### Cache Updates

The `InMemoryCache` now uses stricter type checking for cache updates. Ensure your `cache.modify` calls match the expected types:

```ts
cache.modify({
  fields: {
    myField(existingValue, { readField }) {
      // Return value must match the field's type
      return existingValue;
    }
  }
});
```

## Apollo Elements 4 Changes

### Updated Reactive Controllers

Apollo Elements 4 updates the reactive controller implementations to better support Apollo Client 4's new features:

- Improved error handling
- Better TypeScript inference
- Enhanced subscription handling

### Migration Steps

1. **Update imports** - All imports should continue to work as before
2. **Check custom type policies** - Verify your type policies work with the new cache implementation
3. **Test error handling** - Review error handling code to ensure compatibility with the new error model
4. **Update tests** - Ensure your tests account for the updated behavior

## Need Help?

If you encounter issues migrating from Apollo Client 3 to 4, check the [Apollo Client migration guide](https://www.apollographql.com/docs/react/migration/3.x-to-4.x) or [open an issue](https://github.com/apollo-elements/apollo-elements/issues/new).
