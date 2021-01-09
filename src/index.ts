import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { handleRequest } from "./handler";
import { pingPong } from "./ping-pong";
import { verifySignature } from "./verify-signature";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  verifySignature(event);

  const pingPongResponse = pingPong(JSON.parse(event.body));
  if (pingPongResponse != null) {
    return {
      statusCode: 200,
      body: JSON.stringify(pingPongResponse),
    };
  }

  return handleRequest(event);
};