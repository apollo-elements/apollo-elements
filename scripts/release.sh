#!/usr/bin/env bash

# not quite ready for that
# npx changeset pre exit

npm run clean
# npm run --workspaces --if-present prepublishOnly

npx changeset publish
