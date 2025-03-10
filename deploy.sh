#!/usr/bin/env sh

# NOTE: This script includes a temporary deployment of the "landing" app
# while hosting services for the full deployment has been put on pause.

# abort on errors
set -e

# clean up previous
rm -rf dist

# change to app directory
cd apps/landing

# build website
bun run build

# change to dist directory
cd dist

# create .nojekyll file
touch .nojekyll

# git init and commit
git init
git add -A
git commit -m 'publish'

# push to gh-pages branch
git push https://github.com/chora-io/web master:gh-pages -f

cd -
