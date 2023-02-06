import { Fn } from "aws-cdk-lib";
import { BackendWs } from "../constructs/backendWs";

function getWsEndpoints(ws: BackendWs) {
  const wsEndpointBase = ws.apiResource.attrApiEndpoint;
  const domainName = Fn.parseDomainName(wsEndpointBase);
  const wsStageName = ws.stageResource.stageName

  const wsEndpoint = `${wsEndpointBase}/${wsStageName}`;
  const wsReplyEndpoint = `https://${domainName}/${wsStageName}`
  return { wsEndpoint, wsReplyEndpoint }
}

export default getWsEndpoints;
