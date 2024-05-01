#!/usr/bin/env sh

# abort on errors
set -e

# clean up previous
rm -rf dist

# compile typescript
tsc --outDir dist

# copy static directories
cp -r assets dist
cp -r styles dist

# copy css modules
copyfiles -u 1 components/*.css dist/components/
copyfiles -u 1 components/**/*.css dist/components/

# copy package json
cp package.npm.json dist/package.json
