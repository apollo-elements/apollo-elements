#!/usr/bin/env bash

# Thanks, Westbrook
[ ! -f .changeset/pre.json ] \
  && npx changeset pre exit
  || echo "Not in prerelease mode"

npx changeset version
