#!/bin/bash

#initial setup
set -e
export $(grep -v '^#' .env | xargs)

yarn rimraf cdk/node_modules
yarn rimraf node_modules
