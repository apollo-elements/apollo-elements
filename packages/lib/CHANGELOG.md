# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.0.0](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/lib@2.0.0...@apollo-elements/lib@3.0.0) (2020-09-24)


### Features

* **create-app:** add create-app generator ([cd73eac](https://github.com/apollo-elements/apollo-elements/commit/cd73eac93ea8b9a57b160b051cadbf26029dff4c))


### Performance Improvements

* **lib:** remove inline Object.fromEntries polyfill ([a12c374](https://github.com/apollo-elements/apollo-elements/commit/a12c374378d325c0820f501202a472d66882ffd7))


* feat(lib)!: apollo client 3 ([ffe6066](https://github.com/apollo-elements/apollo-elements/commit/ffe6066e66d9c6ca347ca62c101bd7606d64ccf8))


### BREAKING CHANGES

* bump to `@apollo/client`
remove default exports

affects: @apollo-elements/mixins, @apollo-elements/hybrids,
@apollo-elements/gluon, @apollo-elements/lit-apollo,
@apollo-elements/polymer





# [3.0.0-alpha.5](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/lib@3.0.0-alpha.4...@apollo-elements/lib@3.0.0-alpha.5) (2020-09-23)


### Features

* **create-app:** add create-app generator ([cbcc223](https://github.com/apollo-elements/apollo-elements/commit/cbcc223f1df6d22656386dd0ead07e8a71e763f0))





# [3.0.0-alpha.4](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/lib@2.0.1-alpha.0...@apollo-elements/lib@3.0.0-alpha.4) (2020-09-18)

**Note:** Version bump only for package @apollo-elements/lib





## [2.0.1-alpha.0](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/lib@2.0.0...@apollo-elements/lib@2.0.1-alpha.0) (2020-09-14)


### Performance Improvements

* **lib:** remove inline Object.fromEntries polyfill ([c17dd52](https://github.com/apollo-elements/apollo-elements/commit/c17dd524125466dc50a37ac01d240330930e7d0f))


* feat(lib)!: apollo client 3 ([588d0f1](https://github.com/apollo-elements/apollo-elements/commit/588d0f198e72e9410508b5c1f1f70ea583e83dcf))


### BREAKING CHANGES

* bump to `@apollo/client`
remove default exports

affects: @apollo-elements/mixins, @apollo-elements/hybrids,
@apollo-elements/gluon, @apollo-elements/lit-apollo,
@apollo-elements/polymer





# [2.0.0](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/lib@1.1.3...@apollo-elements/lib@2.0.0) (2020-05-25)


### Features

* rewrite in typescript ([f69a648](https://github.com/apollo-elements/apollo-elements/commit/f69a6487b917a95af127547077c0d951f8df301b))


### BREAKING CHANGES

* - rename `update` => `updater` in Mutation components
- remove `setVariables` from query-mixin
- make parameters optional on:
  - `ApolloQuery#subscribe`
  - `ApolloSubscription#subscribe`
  - `ApolloQuery#executeQuery`
  - `ApolloQuery#fetchMore` and
  - `ApolloQuery#watchQuery`
- For Hybrids, setting variables now subscribes to the query

affects: @apollo-elements/eslint-config, @apollo-elements/gluon, @apollo-elements/hybrids, @apollo-elements/lib, @apollo-elements/lit-apollo, @apollo-elements/mixins, @apollo-elements/polymer, @apollo-elements/test-helpers





## [1.1.3](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/lib@1.1.2...@apollo-elements/lib@1.1.3) (2020-01-09)


### Bug Fixes

* **lib:** add missing exports to .d.ts ([20e4acc](https://github.com/apollo-elements/apollo-elements/commit/20e4acc))





## [1.1.2](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/lib@1.1.1...@apollo-elements/lib@1.1.2) (2020-01-09)

**Note:** Version bump only for package @apollo-elements/lib





## [1.1.1](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/lib@1.1.0...@apollo-elements/lib@1.1.1) (2019-07-01)


### Bug Fixes

* **lib:** depend on graphql ([d2d2097](https://github.com/apollo-elements/apollo-elements/commit/d2d2097))





# [1.1.0](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/lib@1.0.1...@apollo-elements/lib@1.1.0) (2019-06-12)


### Features

* add module field ([0424d54](https://github.com/apollo-elements/apollo-elements/commit/0424d54))





## [1.0.1](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/lib@0.0.6...@apollo-elements/lib@1.0.1) (2019-05-26)


### Bug Fixes

* **mixins:** allow default options in queries ([4a8895e](https://github.com/apollo-elements/apollo-elements/commit/4a8895e))





# [1.0.0](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/lib@0.0.6...@apollo-elements/lib@1.0.0) (2019-04-03)


### Bug Fixes

* **mixins:** allow default options in queries ([4a8895e](https://github.com/apollo-elements/apollo-elements/commit/4a8895e))





## [0.0.6](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/lib@0.0.5...@apollo-elements/lib@0.0.6) (2019-03-01)

**Note:** Version bump only for package @apollo-elements/lib





## [0.0.5](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/lib@0.0.4...@apollo-elements/lib@0.0.5) (2019-02-28)

**Note:** Version bump only for package @apollo-elements/lib





# CHANGELOG

## 0.0.4
- Sets the NPM registry explicitly

## 0.0.3
- Updates dev dependencies

## 0.0.2
- Adds README
- Adds CHANGELOG

## 0.0.1
- Initial Release
