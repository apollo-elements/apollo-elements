#!/usr/bin/env bash

if [ -z ${var+x} ]; then
cat << EOF > "$HOME/.npmrc"
  //registry.npmjs.org/:_authToken=$NPM_TOKEN
  @apollo-elements:registry=//registry.npmjs.org/:_authToken=$NPM_TOKEN
EOF;

# Thanks, Westbrook
[ ! -f .changeset/pre.json ] && npx changeset pre exit
npm run clean
npx changeset publish
