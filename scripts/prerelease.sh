#!/usr/bin/env bash

yarn changeset pre enter next
yarn changeset version
git add .
git commit -m "chore: version prerelease packages"
