#!/usr/bin/env bash

set -e

TS_PROTO_BIN=../../node_modules/.bin/protoc-gen-ts_proto

# remove/add api directory
rm -rf api && mkdir api

# generate typescript with buf protoc and ts-proto
buf alpha protoc \
  -I "proto" \
  --plugin=${TS_PROTO_BIN} \
  --ts_proto_opt="esModuleInterop=true,forceLong=long,outputTypeRegistry=true,useExactTypes=false,useOptionals=messages" \
  --ts_proto_out=api \
  $(find "proto" -maxdepth 3 -name '*.proto')
