Apollo Client 3 and Apollo Elements 3 both bring with them significant breaking changes. When upgrading your app to `@apollo-elements` 3, follow these steps to ease the transition:

## Replace imports with `@apollo/client/core`
`apollo-client`, `apollo-cache-inmemory`, `apollo-link-*` and others are now supplied by `@apollo/client/core`, so replace your import statements to match.
*NB:* you should always import from `@apollo/client/core`, not from `@apollo/client`, as the latter includes dependencies on `react` which you probably don't need or want. A single import statement from `@apollo/client` in your app can cause the TypeScript compiler to fail if `react` is not installed as a dependency. To avoid this, always import from `@apollo/client/core`.
