#!/bin/bash
set -e

yarn install --frozen-lockfile
cd cdk
yarn install --frozen-lockfile
