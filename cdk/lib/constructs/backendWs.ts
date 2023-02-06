import { CfnApi, CfnDeployment, CfnStage } from 'aws-cdk-lib/aws-apigatewayv2'
import { Construct } from 'constructs'

export class BackendWs extends Construct {
  public apiResource: CfnApi;
  public deploymentResource: CfnDeployment;
  public stageResource: CfnStage;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.apiResource = new CfnApi(this, 'BackendWsApi', {
      name: `${id}WsApi`,
      protocolType: 'WEBSOCKET',
      routeSelectionExpression: '$request.body.action'
    });

    this.deploymentResource = new CfnDeployment(this, 'BackendWsApiDeployment', {
      apiId: this.apiResource.attrApiId,
    });

    this.stageResource = new CfnStage(this, 'BackendWsStage', {
      stageName: 'production',
      apiId: this.apiResource.attrApiId,
      deploymentId: this.deploymentResource.attrDeploymentId,
    })
  }
} 
