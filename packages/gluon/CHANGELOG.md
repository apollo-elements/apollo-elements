# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.0.0-alpha.10](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/gluon@3.0.0-alpha.9...@apollo-elements/gluon@3.0.0-alpha.10) (2020-09-23)

**Note:** Version bump only for package @apollo-elements/gluon





# [3.0.0-alpha.9](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/gluon@3.0.0-alpha.8...@apollo-elements/gluon@3.0.0-alpha.9) (2020-09-18)

**Note:** Version bump only for package @apollo-elements/gluon





# [3.0.0-alpha.8](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/gluon@2.0.2...@apollo-elements/gluon@3.0.0-alpha.8) (2020-09-14)


### Bug Fixes

* make properties configurable and enumerable ([3ee6f66](https://github.com/apollo-elements/apollo-elements/commit/3ee6f66d460fdc3012bd62f16427bf681cb9ec26))


* feat(gluon)!: apollo client 3 ([9d2bbc6](https://github.com/apollo-elements/apollo-elements/commit/9d2bbc6a95561af4eb2103c811638f0fff8f462e))


### BREAKING CHANGES

* bumps to `@apollo/client`
defines variables, mutation, query, subscription with define semantics

affects: @apollo-elements/gluon





# [3.0.0-alpha.7](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/gluon@3.0.0-alpha.5...@apollo-elements/gluon@3.0.0-alpha.7) (2020-09-13)

**Note:** Version bump only for package @apollo-elements/gluon





# [3.0.0-alpha.6](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/gluon@3.0.0-alpha.5...@apollo-elements/gluon@3.0.0-alpha.6) (2020-09-13)

**Note:** Version bump only for package @apollo-elements/gluon





# [3.0.0-alpha.5](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/gluon@3.0.0-alpha.4...@apollo-elements/gluon@3.0.0-alpha.5) (2020-09-07)

**Note:** Version bump only for package @apollo-elements/gluon





# [3.0.0-alpha.4](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/gluon@3.0.0-alpha.3...@apollo-elements/gluon@3.0.0-alpha.4) (2020-09-07)

**Note:** Version bump only for package @apollo-elements/gluon





# [3.0.0-alpha.3](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/gluon@2.0.2...@apollo-elements/gluon@3.0.0-alpha.3) (2020-09-06)


### Bug Fixes

* make properties configurable and enumerable ([a8bfaab](https://github.com/apollo-elements/apollo-elements/commit/a8bfaab51f04e4d80d7ecac0d465e570b2c9b217))


* feat(gluon)!: apollo client 3 ([1cfb14c](https://github.com/apollo-elements/apollo-elements/commit/1cfb14c0739179b1641bede6fdb3f4addfa9dabb))


### BREAKING CHANGES

* bumps to `@apollo/client`
defines variables, mutation, query, subscription with define semantics

affects: @apollo-elements/gluon





# [3.0.0-alpha.2](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/gluon@2.0.2...@apollo-elements/gluon@3.0.0-alpha.2) (2020-09-06)


### Bug Fixes

* make properties configurable and enumerable ([a8bfaab](https://github.com/apollo-elements/apollo-elements/commit/a8bfaab51f04e4d80d7ecac0d465e570b2c9b217))


* feat(gluon)!: apollo client 3 ([1cfb14c](https://github.com/apollo-elements/apollo-elements/commit/1cfb14c0739179b1641bede6fdb3f4addfa9dabb))


### BREAKING CHANGES

* bumps to `@apollo/client`
defines variables, mutation, query, subscription with define semantics

affects: @apollo-elements/gluon





# [3.0.0-alpha.1](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/gluon@3.0.0-alpha.0...@apollo-elements/gluon@3.0.0-alpha.1) (2020-09-03)

**Note:** Version bump only for package @apollo-elements/gluon





# [3.0.0-alpha.0](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/gluon@2.0.2...@apollo-elements/gluon@3.0.0-alpha.0) (2020-09-03)


### Bug Fixes

* make properties configurable and enumerable ([a3247e9](https://github.com/apollo-elements/apollo-elements/commit/a3247e9d41d4c31ebf8477c1402129a0824adf50))


### Features

* **gluon:** apollo client 3 ([b2aafb6](https://github.com/apollo-elements/apollo-elements/commit/b2aafb6255c27e7cb574eff83ede1537960f2bb3))





## [2.0.2](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/gluon@2.0.1...@apollo-elements/gluon@2.0.2) (2020-05-27)

**Note:** Version bump only for package @apollo-elements/gluon





## [2.0.1](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/gluon@2.0.0...@apollo-elements/gluon@2.0.1) (2020-05-25)

**Note:** Version bump only for package @apollo-elements/gluon





# [2.0.0](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/gluon@1.1.5...@apollo-elements/gluon@2.0.0) (2020-05-25)


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





## [1.1.5](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/gluon@1.1.4...@apollo-elements/gluon@1.1.5) (2020-01-09)

**Note:** Version bump only for package @apollo-elements/gluon





## [1.1.4](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/gluon@1.1.3...@apollo-elements/gluon@1.1.4) (2020-01-09)

**Note:** Version bump only for package @apollo-elements/gluon





## [1.1.3](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/gluon@1.1.2...@apollo-elements/gluon@1.1.3) (2020-01-09)


### Bug Fixes

* **gluon:** add missing export to index.js ([cc64d7a](https://github.com/apollo-elements/apollo-elements/commit/cc64d7a))





## [1.1.2](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/gluon@1.1.1...@apollo-elements/gluon@1.1.2) (2020-01-09)

**Note:** Version bump only for package @apollo-elements/gluon





## [1.1.1](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/gluon@1.1.0...@apollo-elements/gluon@1.1.1) (2019-07-01)

**Note:** Version bump only for package @apollo-elements/gluon





# [1.1.0](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/gluon@1.0.2...@apollo-elements/gluon@1.1.0) (2019-06-12)


### Features

* add module field ([0424d54](https://github.com/apollo-elements/apollo-elements/commit/0424d54))





## [1.0.2](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/gluon@1.0.1...@apollo-elements/gluon@1.0.2) (2019-06-06)

**Note:** Version bump only for package @apollo-elements/gluon





## [1.0.1](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/gluon@0.0.11...@apollo-elements/gluon@1.0.1) (2019-05-26)

**Note:** Version bump only for package @apollo-elements/gluon





# [1.0.0](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/gluon@0.0.11...@apollo-elements/gluon@1.0.0) (2019-04-03)

**Note:** Version bump only for package @apollo-elements/gluon





## [0.0.11](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/gluon@0.0.10...@apollo-elements/gluon@0.0.11) (2019-03-01)

**Note:** Version bump only for package @apollo-elements/gluon





## [0.0.10](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/gluon@0.0.9...@apollo-elements/gluon@0.0.10) (2019-02-28)

**Note:** Version bump only for package @apollo-elements/gluon





# CHANGELOG

## 0.0.9
- Sets the NPM registry explicitly

## 0.0.8
- Fixes bug in mutation observer for script children.

## 0.0.7
- Updates dependency graph

## 0.0.6
- Adds `refetch` method to `ApolloQuery`;

## 0.0.5
- Fixes `onCompleted` and `onError` prototype bug.

## 0.0.4
- Sets error if needed after ApolloMutation#mutate

## 0.0.3
- Updates `@apollo-elements/mixins`

## 0.0.2
- Updates README
- Adds CHANGELOG

## 0.0.1
- Initial Release
