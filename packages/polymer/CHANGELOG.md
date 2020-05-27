# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
