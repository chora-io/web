#!/usr/bin/env bash

set -e

TS_PROTO_BIN=../../node_modules/.bin/protoc-gen-ts_proto
PROTO_DIRS=$(find ./proto -path -prune -o -name '*.proto' -print0 | xargs -0 -n1 dirname | sort | uniq)

# remove/add api directory
rm -rf api && mkdir api

# generate typescript with ts-proto
for dir in $PROTO_DIRS; do
  buf alpha protoc \
    -I "proto" \
    --plugin=${TS_PROTO_BIN} \
    --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=messages,outputTypeRegistry=true" \
    --ts_proto_out=api \
    $(find "${dir}" -maxdepth 1 -name '*.proto')
done
