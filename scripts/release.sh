#!/usr/bin/env bash

# Thanks, Westbrook
if [ -f .changeset/pre.json ]; then
  npx changeset pre exit
else
  echo "Not in prerelease mode"
fi

npm run clean

# hack to pre-bundle stampino
npm run postinstall:stampino:bundle
npm run postinstall:stampino:copy
# endhack

npm run build
npx changeset publish
