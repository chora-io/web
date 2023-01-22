#!/usr/bin/env sh

# abort on errors
set -e

# update chora
(cd chora && yarn)

# build chora
yarn build-chora

# clean up modules
rm -rf node_modules
rm -rf main/node_modules
rm -rf coop/node_modules
rm -rf data/node_modules
rm -rf group/node_modules
rm -rf node/node_modules
rm -rf scan/node_modules

# bootstrap
yarn bootstrap

# build apps
yarn build-main
yarn build-coop
yarn build-data
yarn build-group
yarn build-node
yarn build-scan

# clean up public
rm -rf public

# copy public directories
cp -r main/public public
cp -r coop/public public/coop
cp -r data/public public/data
cp -r group/public public/group
cp -r node/public public/node
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
