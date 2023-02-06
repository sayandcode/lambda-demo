import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BackendLambda } from './constructs/backendLambda';
import { BackendWs } from './constructs/backendWs';
import { WsHttpRoute } from './constructs/wsHttpRoute';
import getWsReplyPermission from './utils/lambdaWsReplyPermission';
import getWsEndpoints from './utils/wsEndpoints';

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    /* CREATE RESOURCES */
    // lambda
    const lambda = new BackendLambda(this, 'BackendLambdaConstruct')

    // ws
    const ws = new BackendWs(this, 'BackendWs')
    const connectRoute = new WsHttpRoute(this, 'BackendWsConnectRoute', {
      apiId: ws.apiResource.attrApiId,
      routeKey: '$connect',
      httpEndpoint: {
        uri: `${lambda.urlObj.url}hello`, // lambda url ends with '/'
        method: 'POST'
      },
      bodyTemplate: `{
          "connectionId": "$context.connectionId"
        }`
    });
    const randomNumRoute = new WsHttpRoute(this, 'BackendWsStringRoute', {
      apiId: ws.apiResource.attrApiId,
      routeKey: 'randomNum',
      httpEndpoint: {
        uri: `${lambda.urlObj.url}randomNumUnder`, // lambda url ends with '/'
        method: 'POST'
      },
      bodyTemplate: `{
          "connectionId": "$context.connectionId",
          "num": $input.json('$.payload')
        }`
    });

    /* WIRING */
    // ws
    ws.deploymentResource.addDependency(connectRoute.routeResource);
    ws.deploymentResource.addDependency(randomNumRoute.routeResource);

    // lambda
    const { wsEndpoint, wsReplyEndpoint } = getWsEndpoints(ws)
    lambda.fn.addEnvironment('WS_REPLY_ENDPOINT', wsReplyEndpoint);
    const wsReplyPermission = getWsReplyPermission(this, ws)
    lambda.fn.addToRolePolicy(wsReplyPermission)

    /* OUTPUTS */
    new CfnOutput(this, 'BackendLambdaUrl', {
      value: lambda.urlObj.url,
      description: "The https endpoint where your app is hosted"
    });
    new CfnOutput(this, 'BackendWsReplyUrl', {
      value: wsReplyEndpoint,
      description: "The endpoint for backend to send messages to websocket"
    });
    new CfnOutput(this, 'BackendWsUrl', {
      value: wsEndpoint,
      description: "The ws endpoint where your app is hosted"
    });
  }
}
