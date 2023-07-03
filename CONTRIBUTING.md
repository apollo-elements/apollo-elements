# Contribution Guide

Thank you for your interest in Apollo Elements. If you'd like to make a bug fix or add a feature, please read this guide first.

## Repo Contents

- 👇 [Skip to Bug Fixes](#bug-fixes)
- 👇 [Skip to Feature Requests](#new-features)
- 👇 [Skip to Pull Request Checklist](#pull-request-checklist)
- 👇 [Skip to Release Workflow](#release-workflow)

### Subdirectories

- `docs` - The sources for the [docs website](https://apolloelements.dev)
- `packages` - Sources for the public packages
- `patches` - Occasionally we need to patch an NPM package, e.g. while waiting for bug fixes to get published. We should not patch package dependencies, only repository development dependencies.
- `plugins` - Development tool plugins, e.g. shared config files or monorepo tools
- `scripts` - Shell scripts that run during various processes
- `test` - Test helpers and sources. Contains shared test files, a mocked GraphQL server/client, and GraphQL operations used for testing.

### Documentation

- `CODE_OF_CONDUCT.md` - Contributor Code of Conduct
- `CONTRIBUTING.md` - This document
- `LICENCE.md` - Apollo Elements' software license
- `README.md` - The repository's front page

### Dotfiles

These files mostly configure tools.

- `.changeset` - Stores upcoming CHANGELOG records. See [Changesets](https://github.com/atlassian/changesets)
- `.codeclimate.yml` - Configures [Codeclimate](https://codeclimate.com/) static analysis tools
- `.commitlintrc.json` - Configures [Commitlint](https://commitlint.js.org/#/)
- `.eslintignore` - List of files for [ESLint](https://eslint.org) to ignore
- `.eslintrc.json` - Configures [ESLint](https://eslint.org) to ignore
- `.github` - Configures [Github Actions](https://github.com/apollo-elements/apollo-elements/actions), funding, and other features
- `.gitignore` - List of file for [git](https://git-scm.com/docs/gitignore) to ignore
- `.graphqlrc.yml` - Configures [GraphQL Code Generation](https://graphql-code-generator.com/), mostly for testing
- `.nvmrc` - Configures [NVM](https://github.com/nvm-sh/nvm) to set the node version
- `.stylelintrc.yml` - Configures [Stylelint](https://stylelint.io/) for CSS code standards
- `.vscode` - Configures [Visual Studio Code](https://code.visualstudie.com) to use eslint and stylelint, and to run certain scripts

#### Other Config Files

- `declaration.d.ts` - Allows TypeScript to treat css and graphql files as JS modules
- `netlify.toml` - Configures the [website](https://apolloelements.dev)'s hosting
- `package-lock.json` - Package lock file, establishes exactly which versions of each dependency to install
- `package.json` - The monorepo root, containing most of the development dependencies and some useful scripts
- `rocket.config.js` - Configures [Rocket](https://rocket.modern-web.dev), the web framework used for the docs
- `tsconfig.json` - Configures TypeScript
- `tsconfig.settings.json` - Shared settings for TypeScript
- `web-test-runner.config.js` - Configures the [test runner](https://modern-web.dev/guides/test-runner/getting-started/)

## Bug Fixes

If you notice a bug in Apollo Elements, please [first search the open issues](https://github.com/apollo-elements/apollo-elements/issues), and if you don't find one that matches, [open a new bug report](https://github.com/apollo-elements/apollo-elements/issues/new?assignees=&labels=bug&template=bug_report.md&title=Apollo+Elements+Bug)

## New Features

If you'd like to add a new feature to Apollo Elements, please open a feature request issue to discuss the feature before making a pull request.

## Pull Request Checklist
- Keep your pull request small and scoped to a single issue
- Test your changes
- Add or update documentation (inline, in `/docs`, or both)
- Add a changeset by running
  ```sh
  npx changeset
  ```

## Release Workflow

To make changes that target the `next` dist-tag on npm, make a pull request to the `next` branch. Make sure that tests pass, and that the docs site builds and propertly displays your change. When the PR gets merged, the changesets action will create or update a "Version Packages" PR. Merging _that_ PR will publish the packages with the `next` dist-tag.

Merging `next` into `main` will exit prerelease mode and create a "Versions Packages" PR which graduates the changes per-package according to the highlest semver level changeset added since the last `latest` release. Once _that_ PR is merged, the changes will publish to npm with the `latest` dist tag.

At that point, **`next` must be manually rebased to `main`** in order to make way for the next prerelease cycle.
