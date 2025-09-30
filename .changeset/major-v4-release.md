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

Major version release with breaking changes:

## Apollo Client 4

This release updates the peer dependency from Apollo Client 3.x to Apollo Client 4.x. Apollo Client 4 includes several breaking changes that may affect your application:

- Removed deprecated APIs and features
- Updated cache normalization behavior
- Changes to TypeScript types and generics
- Stricter type checking for queries and mutations

**Migration Resources:**
- [Apollo Client 4 Migration Guide](https://www.apollographql.com/docs/react/migrating/apollo-client-4-migration/)
- [Apollo Elements Migration Guide](https://apolloelements.dev/guides/getting-started/migrating/)

## TypeScript and Node.js

- **TypeScript**: Updated to latest version with improved type inference and stricter type checking
- **Node.js**: Minimum version is now 24.x (previously 18.x)

## Breaking Changes

Applications using Apollo Elements will need to:
1. Upgrade to Apollo Client 4.x
2. Update to Node.js 24.x or later
3. Review and update TypeScript types as needed
4. Test GraphQL operations for any behavior changes introduced by Apollo Client 4

See the migration guides above for detailed upgrade instructions.
