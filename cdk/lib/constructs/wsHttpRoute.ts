import { CfnIntegration, CfnIntegrationProps, CfnIntegrationResponse, CfnRoute, CfnRouteProps, CfnRouteResponse } from 'aws-cdk-lib/aws-apigatewayv2';
import { Construct } from 'constructs'

type WsHttpRouteProps = {
  apiId: CfnRouteProps['apiId'];
  routeKey: CfnRouteProps['routeKey'];
  httpEndpoint: {
    uri: NonNullable<CfnIntegrationProps['integrationUri']>;
    method: NonNullable<CfnIntegrationProps['integrationMethod']>;
  };
  bodyTemplate: string;
}

export class WsHttpRoute extends Construct {
  public readonly routeResource: CfnRoute;
  public readonly integrationResource: CfnIntegration;

  constructor(scope: Construct, id: string, props: WsHttpRouteProps) {
    super(scope, id);

    this.routeResource = new CfnRoute(this, `${id}Route`, {
      apiId: props.apiId,
      routeKey: props.routeKey,
      routeResponseSelectionExpression: '$default',
    })

    this.integrationResource = new CfnIntegration(this, `${id}Integration`, {
      apiId: props.apiId,
      connectionType: 'INTERNET',
      integrationType: 'HTTP',
      integrationUri: props.httpEndpoint.uri,
      integrationMethod: props.httpEndpoint.method,
      passthroughBehavior: 'WHEN_NO_TEMPLATES',
      templateSelectionExpression: '\\$default',
      requestTemplates: {
        $default: props.bodyTemplate,
      }
    })
    this.routeResource.target = `integrations/${this.integrationResource.ref}`;

    new CfnRouteResponse(this, `${id}RouteResponse`, {
      apiId: props.apiId,
      routeId: this.routeResource.ref,
      routeResponseKey: '$default'
    })

    new CfnIntegrationResponse(this, `${id}IntegrationResponse`, {
      apiId: props.apiId,
      integrationId: this.integrationResource.ref,
      integrationResponseKey: '$default'
    })
  }
}

