---
"@apollo-elements/atomico": major
"@apollo-elements/fast": major
"@apollo-elements/hybrids": major
"@apollo-elements/create": patch
---

Update dependencies to latest versions

## Breaking Changes

### @apollo-elements/atomico
- Requires `atomico@^1.80.3` (updated from previous versions)
- Internal implementation updated to use `useHost` + `useMemo` instead of removed `@atomico/hooks/use-controller`

### @apollo-elements/fast
- Requires `@microsoft/fast-element@^2.7.0` (updated from v1.x)
- Internal implementation updated for FAST Element v2 API changes

### @apollo-elements/hybrids
- Requires `hybrids@^9.1.19` (updated from v7.x)
- **User Action Required**: When using hybrids factories, you must now explicitly enable shadow DOM in your component definitions:

```javascript
// Before (hybrids v7)
define({
  tag: 'my-element',
  query: query(MyQuery),
  render: (host) => html`...`,
});

// After (hybrids v9)
define({
  tag: 'my-element',
  query: query(MyQuery),
  render: {
    value: (host) => html`...`,
    shadow: true,  // Required for shadow DOM
  },
});
```

### @apollo-elements/create
- Updated `execa` (v6→v9), `inquirer` (v8→v12), and `mkdirp` (v1→v3)
- No user-facing changes to CLI behavior

## Non-Breaking Changes

All packages updated to latest compatible dependency versions:
- `@changesets/cli@^2.29.7`
- `@rollup/plugin-commonjs@^28.0.6`
- `@typescript-eslint/eslint-plugin@^8.45.0`
- `eslint@^9.37.0`
- `graphql@^16.11.0`
- `mocha@^11.7.4`
- `rollup@^4.52.4`
- `typescript@^5.9.3`
- And many more...
