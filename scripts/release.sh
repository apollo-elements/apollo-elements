#!/usr/bin/env bash

yarn changeset pre exit
yarn clean
yarn workspaces run prepublishOnly

yarn changeset publish
