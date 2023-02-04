#!/bin/bash
set -e

OUT_DIR="dist"
yarn rimraf $OUT_DIR
yarn ncc build src/index.lambda.ts -m -o $OUT_DIR
