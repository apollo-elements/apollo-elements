#!/usr/bin/env bash

# Thanks, Westbrook
if [ -f .changeset/pre.json ]; then
  npx changeset pre exit
  git add .changeset/pre.json
  git config user.name "github-actions[bot]"
  git config user.email "github-actions[bot]@users.noreply.github.com"
  git commit --message "chore: exit prerelease"
else
  echo "Not in prerelease mode"
fi
