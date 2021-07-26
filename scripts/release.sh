#!/usr/bin/env bash

# Thanks, Westbrook
[ ! -f .changeset/pre.json ] && npx changeset pre exit
npm run clean
npx changeset publish
