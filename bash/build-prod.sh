#!/bin/bash

# initial setup
set -e
export $(grep -v '^#' .env | xargs)

OUT_DIR="dist"
yarn rimraf $OUT_DIR
yarn ncc build src/index.lambda.ts -m -o $OUT_DIR
