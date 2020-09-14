# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.0.0-alpha.8](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/polymer@2.0.1...@apollo-elements/polymer@3.0.0-alpha.8) (2020-09-14)


### Bug Fixes

* make properties configurable and enumerable ([3ee6f66](https://github.com/apollo-elements/apollo-elements/commit/3ee6f66d460fdc3012bd62f16427bf681cb9ec26))


* feat(polymer)!: apollo client 3 ([c89b5c0](https://github.com/apollo-elements/apollo-elements/commit/c89b5c0662a3408c3a9f8b4adace6d4746ae8459))
* feat(mixins)!: apollo client 3 ([9642c7a](https://github.com/apollo-elements/apollo-elements/commit/9642c7a3a44acd231a5e9e11ed47cdc0ad5db58e))


### BREAKING CHANGES

* bump to `@apollo/client`
removes class fields, preferring declarations

affects: @apollo-elements/polymer
* bump to `@apollo/client`
use define semantics in some fields (query, mutation, subscription, document) for better TypeScript 4 support
use 'ambient' class field declarations

affects:
@apollo-elements/gluon,
@apollo-elements/hybrids,
@apollo-elements/interfaces,
@apollo-elements/lib,
@apollo-elements/lit-apollo,
@apollo-elements/mixins,
@apollo-elements/polymer,
@apollo-elements/test-helpers





# [3.0.0-alpha.7](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/polymer@3.0.0-alpha.5...@apollo-elements/polymer@3.0.0-alpha.7) (2020-09-13)

**Note:** Version bump only for package @apollo-elements/polymer





# [3.0.0-alpha.6](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/polymer@3.0.0-alpha.5...@apollo-elements/polymer@3.0.0-alpha.6) (2020-09-13)

**Note:** Version bump only for package @apollo-elements/polymer





# [3.0.0-alpha.5](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/polymer@3.0.0-alpha.4...@apollo-elements/polymer@3.0.0-alpha.5) (2020-09-07)

**Note:** Version bump only for package @apollo-elements/polymer





# [3.0.0-alpha.4](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/polymer@3.0.0-alpha.3...@apollo-elements/polymer@3.0.0-alpha.4) (2020-09-07)

**Note:** Version bump only for package @apollo-elements/polymer





# [3.0.0-alpha.3](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/polymer@2.0.1...@apollo-elements/polymer@3.0.0-alpha.3) (2020-09-06)


### Bug Fixes

* **mixins:** remove old export ([d8a0153](https://github.com/apollo-elements/apollo-elements/commit/d8a015342d6deeab5775ca1ee2f5d2dba8ee4f42))
* make properties configurable and enumerable ([a8bfaab](https://github.com/apollo-elements/apollo-elements/commit/a8bfaab51f04e4d80d7ecac0d465e570b2c9b217))


* feat(polymer)!: apollo client 3 ([ce22bef](https://github.com/apollo-elements/apollo-elements/commit/ce22bef2dfc5f09f144b3737189fc7c6ccfd4a75))


### BREAKING CHANGES

* bump to `@apollo/client`
removes class fields, preferring declarations

affects: @apollo-elements/polymer





# [3.0.0-alpha.2](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/polymer@2.0.1...@apollo-elements/polymer@3.0.0-alpha.2) (2020-09-06)


### Bug Fixes

* make properties configurable and enumerable ([a8bfaab](https://github.com/apollo-elements/apollo-elements/commit/a8bfaab51f04e4d80d7ecac0d465e570b2c9b217))


* feat(polymer)!: apollo client 3 ([ce22bef](https://github.com/apollo-elements/apollo-elements/commit/ce22bef2dfc5f09f144b3737189fc7c6ccfd4a75))


### BREAKING CHANGES

* bump to `@apollo/client`
removes class fields, preferring declarations

affects: @apollo-elements/polymer





# [3.0.0-alpha.1](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/polymer@3.0.0-alpha.0...@apollo-elements/polymer@3.0.0-alpha.1) (2020-09-03)

**Note:** Version bump only for package @apollo-elements/polymer





# [3.0.0-alpha.0](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/polymer@2.0.1...@apollo-elements/polymer@3.0.0-alpha.0) (2020-09-03)


### Bug Fixes

* make properties configurable and enumerable ([a3247e9](https://github.com/apollo-elements/apollo-elements/commit/a3247e9d41d4c31ebf8477c1402129a0824adf50))


### Features

* **polymer:** apollo client 3 ([85909b5](https://github.com/apollo-elements/apollo-elements/commit/85909b5e8a7683c395a3b0e842c3e86faf7b72f5))





## [2.0.1](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/polymer@2.0.0...@apollo-elements/polymer@2.0.1) (2020-05-27)

**Note:** Version bump only for package @apollo-elements/polymer





# [2.0.0](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/polymer@1.1.5...@apollo-elements/polymer@2.0.0) (2020-05-25)


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





## [1.1.5](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/polymer@1.1.4...@apollo-elements/polymer@1.1.5) (2020-01-09)

**Note:** Version bump only for package @apollo-elements/polymer





## [1.1.4](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/polymer@1.1.3...@apollo-elements/polymer@1.1.4) (2020-01-09)

**Note:** Version bump only for package @apollo-elements/polymer





## [1.1.3](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/polymer@1.1.2...@apollo-elements/polymer@1.1.3) (2020-01-09)

**Note:** Version bump only for package @apollo-elements/polymer





## [1.1.2](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/polymer@1.1.1...@apollo-elements/polymer@1.1.2) (2020-01-09)

**Note:** Version bump only for package @apollo-elements/polymer





## [1.1.1](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/polymer@1.1.0...@apollo-elements/polymer@1.1.1) (2019-07-01)

**Note:** Version bump only for package @apollo-elements/polymer





# [1.1.0](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/polymer@1.0.2...@apollo-elements/polymer@1.1.0) (2019-06-12)


### Features

* add module field ([0424d54](https://github.com/apollo-elements/apollo-elements/commit/0424d54))





## [1.0.2](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/polymer@1.0.1...@apollo-elements/polymer@1.0.2) (2019-06-06)

**Note:** Version bump only for package @apollo-elements/polymer





## [1.0.1](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/polymer@0.0.11...@apollo-elements/polymer@1.0.1) (2019-05-26)


### Bug Fixes

* **polymer:** remove bubbles and composed ([315c6cf](https://github.com/apollo-elements/apollo-elements/commit/315c6cf))





# [1.0.0](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/polymer@0.0.11...@apollo-elements/polymer@1.0.0) (2019-04-03)


### Bug Fixes

* **polymer:** remove bubbles and composed ([315c6cf](https://github.com/apollo-elements/apollo-elements/commit/315c6cf))





## [0.0.11](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/polymer@0.0.10...@apollo-elements/polymer@0.0.11) (2019-03-01)

**Note:** Version bump only for package @apollo-elements/polymer





## [0.0.10](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/polymer@0.0.9...@apollo-elements/polymer@0.0.10) (2019-02-28)

**Note:** Version bump only for package @apollo-elements/polymer





# CHANGELOG

## 0.0.9
- Sets the NPM registry explicitly

## 0.0.8
- Fixes bug in mutation observer for script children.

## 0.0.7
- Updates dependency graph

## 0.0.6
- Adds `refetch` method to `<apollo-query>`;

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
