#!/bin/bash
set -e

yarn build:prod
cd cdk/
yarn deploy

