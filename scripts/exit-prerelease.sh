#!/usr/bin/env bash

# Thanks, Westbrook
if [ -f .changeset/pre.json ]; then
  npx changeset pre exit
  git add .changeset/pre.json
else
  echo "Not in prerelease mode"
fi
