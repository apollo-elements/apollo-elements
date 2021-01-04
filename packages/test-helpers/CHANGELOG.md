# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.2.1](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/test-helpers@1.2.0...@apollo-elements/test-helpers@1.2.1) (2021-01-04)


### Bug Fixes

* fix mixin types ([d3f789f](https://github.com/apollo-elements/apollo-elements/commit/d3f789f62cc088505bf7a6f4e390ac37c54ef6c1))





# [1.2.0](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/test-helpers@1.2.0-alpha.2...@apollo-elements/test-helpers@1.2.0) (2021-01-04)


### Bug Fixes

* **lib:** add graphql as peerDependency ([6804208](https://github.com/apollo-elements/apollo-elements/commit/68042089167222b8ca13895f88077b38e973e186))





# [1.2.0-alpha.2](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/test-helpers@1.2.0-alpha.0...@apollo-elements/test-helpers@1.2.0-alpha.2) (2020-12-21)


### Features

* support for TypedDocumentNode ([d39ca4e](https://github.com/apollo-elements/apollo-elements/commit/d39ca4e0094220cfceba97b9bfe59ed078045560))





# [1.2.0-alpha.1](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/test-helpers@1.2.0-alpha.0...@apollo-elements/test-helpers@1.2.0-alpha.1) (2020-12-05)


### Features

* support for TypedDocumentNode ([152b4f0](https://github.com/apollo-elements/apollo-elements/commit/152b4f0e66ff22b7aa30c7b926db8291b0cbdfea))





# [1.2.0-alpha.0](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/test-helpers@1.1.0...@apollo-elements/test-helpers@1.2.0-alpha.0) (2020-12-04)


### Features

* support TypeScript strict mode ([a8953d0](https://github.com/apollo-elements/apollo-elements/commit/a8953d08d8e050d9ad4e5b9728a7ed44fcc18fa8))





# [1.1.0](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/test-helpers@1.0.2...@apollo-elements/test-helpers@1.1.0) (2020-11-22)


### Bug Fixes

* **mixins:** fire disconnect events on window ([8a79df3](https://github.com/apollo-elements/apollo-elements/commit/8a79df360b1943d50f76c8689da1a5ec6300276b))


### Features

* add haunted support ([36b2648](https://github.com/apollo-elements/apollo-elements/commit/36b2648bf0f4ff096d9d21036fa7805d5909fa1a))





## [1.0.2](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/test-helpers@1.0.1...@apollo-elements/test-helpers@1.0.2) (2020-11-08)

**Note:** Version bump only for package @apollo-elements/test-helpers





## [1.0.1](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/test-helpers@1.0.0...@apollo-elements/test-helpers@1.0.1) (2020-09-29)

**Note:** Version bump only for package @apollo-elements/test-helpers





# [1.0.0](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/test-helpers@0.1.0...@apollo-elements/test-helpers@1.0.0) (2020-09-24)


* feat(test-helpers)!: apollo client 3 ([60ee5ac](https://github.com/apollo-elements/apollo-elements/commit/60ee5ac939802ef209ac1b3f8e5ad68c0b1f40db))


### BREAKING CHANGES

* bump to `@apollo/client`





## [0.1.1-alpha.1](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/test-helpers@0.1.1-alpha.0...@apollo-elements/test-helpers@0.1.1-alpha.1) (2020-09-18)

**Note:** Version bump only for package @apollo-elements/test-helpers





## [0.1.1-alpha.0](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/test-helpers@0.1.0...@apollo-elements/test-helpers@0.1.1-alpha.0) (2020-09-14)


* feat(test-helpers)!: apollo client 3 ([ca6fd3c](https://github.com/apollo-elements/apollo-elements/commit/ca6fd3c182fa87f14452784ace41e171c0f19901))


### BREAKING CHANGES

* bump to `@apollo/client`





# [0.1.0](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/test-helpers@0.0.9...@apollo-elements/test-helpers@0.1.0) (2020-05-25)


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





## [0.0.9](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/test-helpers@0.0.4...@apollo-elements/test-helpers@0.0.9) (2020-01-09)

**Note:** Version bump only for package @apollo-elements/test-helpers





## [0.0.7](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/test-helpers@0.0.4...@apollo-elements/test-helpers@0.0.7) (2020-01-09)

**Note:** Version bump only for package @apollo-elements/test-helpers





## [0.0.6](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/test-helpers@0.0.4...@apollo-elements/test-helpers@0.0.6) (2020-01-09)

**Note:** Version bump only for package @apollo-elements/test-helpers





## [0.0.5](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/test-helpers@0.0.4...@apollo-elements/test-helpers@0.0.5) (2020-01-09)

**Note:** Version bump only for package @apollo-elements/test-helpers





## [0.0.4](https://github.com/apollo-elements/apollo-elements/compare/@apollo-elements/test-helpers@0.0.3...@apollo-elements/test-helpers@0.0.4) (2019-05-26)

**Note:** Version bump only for package @apollo-elements/test-helpers
