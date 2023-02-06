#!/bin/bash

#initial setup
set -e
export $(grep -v '^#' .env | xargs)

yarn install --frozen-lockfile
cd cdk
yarn install --frozen-lockfile
