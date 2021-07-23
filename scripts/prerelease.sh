#!/usr/bin/env bash

# Thanks, Westbrook
[ ! -f .changeset/pre.json ] \
  && npx changeset pre enter next \
  || echo 'Already in pre mode'

npx changeset version
git add .
git commit -m "chore: version prerelease packages"
