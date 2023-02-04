import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'node:path';
import { Construct } from 'constructs';

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // lambda fn
    const codeLocalUri = path.join(__dirname, '../../dist/')
    const backendLambda = new lambda.Function(this, 'express-backend', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset(codeLocalUri),
      handler: 'index.handler',
    })

    const backendUrl = backendLambda.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ["*"],
        allowCredentials: true,
      }
    })

    // outputs
    new CfnOutput(this, 'BackendLambdaUrl', {
      value: backendUrl.url,
      description: "The https endpoint where your app is hosted"
    })
  }
}
