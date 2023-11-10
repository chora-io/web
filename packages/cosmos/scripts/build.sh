#!/usr/bin/env sh

# abort on errors
set -e

# clean up previous
rm -rf dist

# compile typescript
tsc --outDir dist

# generate api from proto
./scripts/protocgen.sh

# copy package json
cp package.npm.json dist/package.json
