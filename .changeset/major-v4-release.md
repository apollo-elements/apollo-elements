---
"@apollo-elements/components": major
"@apollo-elements/lit-apollo": major
"@apollo-elements/atomico": major
"@apollo-elements/haunted": major
"@apollo-elements/hybrids": major
"@apollo-elements/polymer": major
"@apollo-elements/create": major
"@apollo-elements/mixins": major
"@apollo-elements/gluon": major
"@apollo-elements/core": major
"@apollo-elements/fast": major
---

**BREAKING CHANGE**: Apollo Client 4 and Node.js 24

This release updates from Apollo Client 3.x to Apollo Client 4.x.

## Installing Apollo Client 4

**Before:**
```bash
npm install @apollo/client@^3.0.0
```

**After:**
```bash
npm install @apollo/client@^4.0.6
```

## Requirements

- **Node.js**: Minimum version is now 24.x (previously 18.x)
- **TypeScript**: Minimum version is now 4.7 (if using TypeScript)

## Cache API Changes

The deprecated `writeData` method has been removed. Use `writeQuery`, `writeFragment`, or `cache.modify` instead:

**Before:**
```typescript
cache.writeData({
  data: { user: { id: '1', name: 'Alice' } }
});
```

**After:**
```typescript
cache.writeQuery({
  query: gql`query GetUser { user { id name } }`,
  data: { user: { id: '1', name: 'Alice' } }
});
```

## Error Handling

Error handling is more consistent in Apollo Client 4:

```typescript
const { data, error, errors } = await client.query({ query });

if (error) {
  // Network error or single GraphQL error
}
if (errors) {
  // Multiple GraphQL errors
}
```

## Migration

See the full migration guides for detailed instructions:
- [Apollo Elements Migration Guide](https://apolloelements.dev/guides/getting-started/migrating/apollo-client-3/)
- [Apollo Client 4 Migration Guide](https://www.apollographql.com/docs/react/migration/3.x-to-4.x)
