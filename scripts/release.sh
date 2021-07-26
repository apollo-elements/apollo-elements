#!/usr/bin/env bash

[ -z ${NPM_TOKEN+x} ] && cat << EOF > "$HOME/.npmrc"
  //registry.npmjs.org/:_authToken=$NPM_TOKEN
  @apollo-elements:registry=//registry.npmjs.org/:_authToken=$NPM_TOKEN
EOF;

# Thanks, Westbrook
[ ! -f .changeset/pre.json ] && npx changeset pre exit
npm run clean
npx changeset publish
