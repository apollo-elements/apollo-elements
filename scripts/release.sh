#!/usr/bin/env bash

yarn clean
yarn workspaces run prepublishOnly

yarn changeset publish
