#!/usr/bin/env sh

# abort on errors
set -e

# bootstrap
yarn bootstrap

# build
yarn build

# clean up public
rm -rf public

# copy public directories
cp -r main/public public
cp -r dao/public public/dao
cp -r data/public public/data
cp -r scan/public public/scan

# add CNAME file
echo 'chora.io' >> public/CNAME

# change to public directory
cd public

# clean up git
rm -rf .git

# git init and commit
git init
git add -A
git commit -m 'publish'

# push to gh-pages branch
git push https://github.com/choraio/web master:gh-pages -f

cd -
