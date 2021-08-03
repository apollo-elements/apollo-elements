#!/usr/bin/env bash

# Thanks, Westbrook
if [ -f .changeset/pre.json ]; then
  npx changeset pre exit
else
  echo "Not in prerelease mode"
fi

npm run clean
npx changeset publish
