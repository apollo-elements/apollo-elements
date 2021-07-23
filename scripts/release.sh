#!/usr/bin/env bash

# not quite ready for that
# yarn changeset pre exit

npm run clean
# yarn workspaces run prepublishOnly

npx changeset publish
