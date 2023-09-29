#!/usr/bin/env sh

# abort on errors
set -e

# error if not run within root of chora package
if ! grep -q "\"name\": \"chora\"" ./package.json ; then
  echo "ERROR: This command must be run from the root of the chora package."
  return 1
fi

# compile javascript files
ts-node ./build.ts

# copy assets to distribution directory
cp -r ./assets ./dist/assets

# copy styles to distribution directory
cp -r ./styles ./dist/styles
