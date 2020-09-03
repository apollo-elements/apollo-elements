# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.0.0-alpha.0](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/mixins@2.0.1...@apollo-elements/mixins@3.0.0-alpha.0) (2020-09-03)


### Bug Fixes

* make properties configurable and enumerable ([a3247e9](https://github.com/apollo-elements/apollo-elements/commit/a3247e9d41d4c31ebf8477c1402129a0824adf50))
* null check ([874cbee](https://github.com/apollo-elements/apollo-elements/commit/874cbeeb24e859c01e609008521e6486a37643f3))


### Features

* **interfaces:** publish interfaces separate pkg ([5c36f4f](https://github.com/apollo-elements/apollo-elements/commit/5c36f4f62c42790044db1bd1847c60f736557b01))
* **mixins:** apollo client 3 ([d353c67](https://github.com/apollo-elements/apollo-elements/commit/d353c67f8b18f26c7314f1ca8a76d2fb1278491e))


### BREAKING CHANGES

* **interfaces:** Removes interfaces from mixins package





## [2.0.1](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/mixins@2.0.0...@apollo-elements/mixins@2.0.1) (2020-05-27)


### Bug Fixes

* **lit-apollo:** manually fix declarations ([e98160c](https://github.com/apollo-elements/apollo-elements/commit/e98160ca0d59e70c527364ffa1ee1a54b012670d))





# [2.0.0](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/mixins@1.2.1...@apollo-elements/mixins@2.0.0) (2020-05-25)


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





## [1.2.1](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/mixins@1.2.0...@apollo-elements/mixins@1.2.1) (2020-01-09)


### Performance Improvements

* **mixins:** deduplicate mixins ([3130b0a](https://github.com/apollo-elements/apollo-elements/commit/3130b0a)), closes [#38](https://github.com/apollo-elements/apollo-elements/issues/38)





# [1.2.0](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/mixins@1.1.3...@apollo-elements/mixins@1.2.0) (2020-01-09)


### Features

* **mixins:** add onData, onError to ApolloQuery ([0a34e00](https://github.com/apollo-elements/apollo-elements/commit/0a34e00)), closes [#42](https://github.com/apollo-elements/apollo-elements/issues/42)





## [1.1.3](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/mixins@1.1.2...@apollo-elements/mixins@1.1.3) (2020-01-09)


### Bug Fixes

* **mixins:** add missing exports to index and .d.ts ([c7fdb99](https://github.com/apollo-elements/apollo-elements/commit/c7fdb99))





## [1.1.2](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/mixins@1.1.1...@apollo-elements/mixins@1.1.2) (2020-01-09)

**Note:** Version bump only for package @apollo-elements/mixins





## [1.1.1](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/mixins@1.1.0...@apollo-elements/mixins@1.1.1) (2019-07-01)

**Note:** Version bump only for package @apollo-elements/mixins





# [1.1.0](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/mixins@1.0.2...@apollo-elements/mixins@1.1.0) (2019-06-12)


### Features

* add module field ([0424d54](https://github.com/apollo-elements/apollo-elements/commit/0424d54))





## [1.0.2](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/mixins@1.0.1...@apollo-elements/mixins@1.0.2) (2019-06-06)


### Bug Fixes

* **mixins:** improved type docs ([0ac2a3a](https://github.com/apollo-elements/apollo-elements/commit/0ac2a3a))





## [1.0.1](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/mixins@0.0.11...@apollo-elements/mixins@1.0.1) (2019-05-26)


### Bug Fixes

* **mixins:** allow default options in queries ([4a8895e](https://github.com/apollo-elements/apollo-elements/commit/4a8895e))





# [1.0.0](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/mixins@0.0.11...@apollo-elements/mixins@1.0.0) (2019-04-03)


### Bug Fixes

* **mixins:** allow default options in queries ([4a8895e](https://github.com/apollo-elements/apollo-elements/commit/4a8895e))





## [0.0.11](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/mixins@0.0.10...@apollo-elements/mixins@0.0.11) (2019-03-01)

**Note:** Version bump only for package @apollo-elements/mixins





## [0.0.10](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/mixins@0.0.9...@apollo-elements/mixins@0.0.10) (2019-02-28)

**Note:** Version bump only for package @apollo-elements/mixins





# CHANGELOG

## 0.0.9
- Sets the NPM registry explicitly

## 0.0.8
- Initializes MutationObserver in `connectedCallback`.

## 0.0.7
- Updates dependency graph

## 0.0.6
- Adds `refetch` method to ApolloQuery
- Adds deprecation notice to `setVariables` method

## 0.0.5
- Fixes `onCompleted` and `onError` prototype bug

## 0.0.4
- Sets error if needed after ApolloMutation#mutate

## 0.0.3
- Fixes a bug in `ApolloQuery#subscribeToMore`. We now pass the arguments as is to `ObservableQuery#subscribeToMore`

## 0.0.2
- Updates README
- Adds CHANGELOG

## 0.0.1
- Initial Release
