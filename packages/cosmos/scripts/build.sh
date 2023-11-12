#!/usr/bin/env sh

# abort on errors
set -e

# generate api from proto
./scripts/protocgen.sh

# clean up previous
rm -rf dist

# compile typescript
tsc --outDir dist

# copy package json
cp package.npm.json dist/package.json
