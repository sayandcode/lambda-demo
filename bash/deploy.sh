#!/bin/bash

yarn build:prod
cd cdk/
yarn deploy

