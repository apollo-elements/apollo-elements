# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
