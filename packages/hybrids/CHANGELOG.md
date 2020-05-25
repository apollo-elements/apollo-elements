# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/hybrids@1.1.3...@apollo-elements/hybrids@2.0.0) (2020-05-25)


### Bug Fixes

* **mixins:** remove cache-first fetch-policy ([0db5d67](https://github.com/apollo-elements/apollo-elements/commit/0db5d673e79e2b96db849b0cd79a151be4b48223))


### Features

* rewrite in typescript ([f69a648](https://github.com/apollo-elements/apollo-elements/commit/f69a6487b917a95af127547077c0d951f8df301b))


### BREAKING CHANGES

* **mixins:** removes default fetch-policy per instance

affects: @apollo-elements/mixins, @apollo-elements/hybrids, @apollo-elements/gluon, @apollo-elements/lit-apollo, @apollo-elements/polymer

Co-authored-by: Kevin Simper <kevin.simper@gmail.com>
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





## [1.1.3](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/hybrids@1.1.2...@apollo-elements/hybrids@1.1.3) (2020-01-09)

**Note:** Version bump only for package @apollo-elements/hybrids





## [1.1.2](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/hybrids@1.1.1...@apollo-elements/hybrids@1.1.2) (2020-01-09)


### Bug Fixes

* **hybrids:** remove bad import from index.js ([c60ef05](https://github.com/apollo-elements/apollo-elements/commit/c60ef05)), closes [#63](https://github.com/apollo-elements/apollo-elements/issues/63)





## [1.1.1](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/hybrids@1.1.0...@apollo-elements/hybrids@1.1.1) (2019-07-01)

**Note:** Version bump only for package @apollo-elements/hybrids





# [1.1.0](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/hybrids@1.0.1...@apollo-elements/hybrids@1.1.0) (2019-06-12)


### Features

* add module field ([0424d54](https://github.com/apollo-elements/apollo-elements/commit/0424d54))





## [1.0.1](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/hybrids@0.0.6...@apollo-elements/hybrids@1.0.1) (2019-05-26)

**Note:** Version bump only for package @apollo-elements/hybrids





# [1.0.0](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/hybrids@0.0.6...@apollo-elements/hybrids@1.0.0) (2019-04-03)

**Note:** Version bump only for package @apollo-elements/hybrids





## [0.0.6](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/hybrids@0.0.5...@apollo-elements/hybrids@0.0.6) (2019-03-01)

**Note:** Version bump only for package @apollo-elements/hybrids





## [0.0.5](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/hybrids@0.0.4...@apollo-elements/hybrids@0.0.5) (2019-02-28)

**Note:** Version bump only for package @apollo-elements/hybrids





# CHANGELOG

## 0.0.4
- Sets the NPM registry explicitly

## 0.0.3
- Updates dev dependencies

## 0.0.2
- Updates README
- Adds CHANGELOG

## 0.0.1
- Initial Release
