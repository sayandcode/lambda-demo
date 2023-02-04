#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkStack } from '../lib/cdk-stack';

const defaultAcc = process.env['CDK_DEFAULT_ACCOUNT'];
if (!defaultAcc) throw new Error("No default error found");

const app = new cdk.App();
new CdkStack(app, 'LambdaDemo', {
  env: { account: defaultAcc, region: 'ap-south-1' },
});
