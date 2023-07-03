---
description: How to migrate a yarn workspaces monorepo from lerna and semantic-release to changesets
tags:
  - open-source
  - devops
  - github
  - npm
published: false
generateSocialImage: true
date: 2021-04-27
updated: Last Modified
---

# Migrating from Lerna to Changesets

Remove lerna along with associated config and packages, we don't need them anymore.

```sh
rm lerna.
yarn remove -W \
  lerna \
  cz-lerna-changelog \
  @commitlint/config-lerna-scopes
```

Install changesets and bootstrap the config.
```sh
yarn add -WD @changesets/cli
yarn changeset init
```

And since this is open source, we'll set "access" to "public" in `.changeset/config.json`.

Next we'll update our commitlint config:

```sh
yarn add -WD commitlint-plugin-workspace-scopes
```

```diff
  {
    "extends": [
      "@commitlint/config-conventional",
 -    "@commitlint/config-lerna-scopes"
 -  ]
 +  ],
 +  "plugins": ['workspace-scopes'],
 +  "rules": {
 +    "scope-enum": [2, "always", []]
 +  }
  }
```

## Continuous Delivery
We had a flaky CD setup via lerna and GitHub actions, which would often fail horribly. Let's update that to use Changesets:

```yaml
name: Release

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2-beta
        with:
          node-version: '15'
          registry-url: 'https://registry.npmjs.org'

      - name: Install packages
        run: yarn --frozen-lockfile

      - name: Codegen
        run: yarn build:codegen

      - name: Lint
        run: yarn lint

      - name: Test
        run: yarn test

      - name: Publish Code Coverage
        uses: paambaati/codeclimate-action@v2.7.3
        env:
          CC_TEST_REPORTER_ID: ${{ secrets.CC_TEST_REPORTER_ID }}

      - name: Create Release Pull Request or Publish to npm
        id: changesets
        uses: changesets/action@master
        with:
          publish: yarn release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

That `yarn release` script runs the following commands
```sh
yarn clean
yarn workspaces run prepublishOnly

yarn changeset publish
```

We also have a prerelease version of that workflow that cuts prereleases when merging to `next`:

```yaml

name: Prerelease

on:
  push:
    branches:
      - next

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      # same setup as release.yml

      - name: Create Release Pull Request or Publish to npm
        id: changesets
        uses: changesets/action@master
        with:
          publish: yarn release
          version: yarn release:prerelease
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

`yarn release:prerelease` does

```sh
yarn changeset pre enter next
yarn changeset version
git add .
git commit -m "chore: version prerelease packages"
```

Previously, we did the lerna equivalent of those via npm-run-all scripts, and we had a lot of extra steps to prevent bad builds. Now we replaced all those package.json scripts with:

```json
"release": "sh scripts/release.sh",
"release:prerelease": "sh scripts/prerelease.sh",
"postrelease": "yarn clean",
```

## Bonus: Backfilling changesets on a large PR.

The PR which added changesets was horribly large, with no end to its scope in sight (sue me).
Using git's interactive rebase command, we can add in changesets after the fact:

```sh
git rebase --interactive origin/main
```

```git
edit 7f90efa5 fix(mixins): remove unused properties from query
break
pick d26b726d fix(create): mock node globals
break
pick ac74906e feat(components): add `<apollo-query>` component
pick bf485a28 feat(components): templates in `<apollo-mutation>`
pick abcdf231 feat(components): add `<apollo-subscription>`
break
pick 42bef132 test(fast): fix typings
pick 44de7bdf feat(lib)!: allow omitting keys when applying prototypes
pick a42ab820 fix(haunted): update lib version
break
pick 6a086b3d feat(hybrids)!: upgrade to v5
break
pick bbfd98b5 chore: update dependencies
pick c8663698 docs: update docs
pick 8bc127d1 chore: fix linter config
pick f6f906b5 style: lint
pick b1fed46a chore: coverage config
pick c1bbd4f0 feat(mixins)!: graphql-script-child-mixin
break
pick 462cf06c chore: migrate from lerna to changesets
pick 38b9fd1f chore: configure broken link checker action
```

those `break` commands essentially pause the rebase. Whenever git encounters one, it breaks back to the shell, which lets us add a changeset for that or for those commits.

Since my PR actually installed and configured changesets in the last commit, I needed to set up the `.changeset` dir before running `yarn changeset` on any of those breaks. Rebasing would be a chore, so instead I amended the first commit, adding in the `./changeset/config.json` file even "before" installing it.

At each break, I ran `yarn changeset` to start the changesets wizard, and usually opened the text editor to draft the changelog portion of the changeset. I carefully studied both the existing `lerna-semantic-release` commit message as well as the git diff, so that the changelog accurately reflected the changes made. Once finished, I ran `git commit --amend` and then `git rebase --continue` to move on to the next one.
