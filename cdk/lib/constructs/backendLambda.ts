import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'node:path';

export class BackendLambda extends Construct {
  public fn: lambda.Function;
  public urlObj: lambda.FunctionUrl;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const codeLocalUri = path.join(__dirname, '../../../dist/');
    this.fn = new lambda.Function(this, 'express-backend', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset(codeLocalUri),
      handler: 'index.handler',
    });

    // we are using the constructer over the 'addFunctionUrl', in order to have access to the resource ref
    this.urlObj = this.fn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ["*"],
        allowCredentials: true,
      }
    });
  }
}

