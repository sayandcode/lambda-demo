import { BackendWs } from "../constructs/backendWs";
import { PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam'
import { Stack } from "aws-cdk-lib";

function getWsReplyPermission(stack: Stack, ws: BackendWs) {
  const wsReplyPermission = new PolicyStatement({
    effect: Effect.ALLOW,
    actions: [
      'execute-api:Invoke',
      'execute-api:ManageConnections'
    ],
    resources: [`arn:aws:execute-api:${stack.region}:${stack.account}:${ws.apiResource.attrApiId}/${ws.stageResource.stageName}/*/@connection*`]
  })
  return wsReplyPermission;
}

export default getWsReplyPermission;
