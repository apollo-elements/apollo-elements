#!/usr/bin/env bash

# Thanks, Westbrook
[ ! -f .changeset/pre.json ] \
  && yarn changeset pre enter next \
  || echo 'Already in pre mode'

yarn changeset version
git add .
git commit -m "chore: version prerelease packages"
