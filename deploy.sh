#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build

# change to build directory
cd main/public

# deploy to custom domain
echo 'chora.io' >> CNAME

# git init and commit
git init
git add -A
git commit -m 'publish'

# push to gh-pages branch
git push https://github.com/choraio/web master:gh-pages -f

cd -
