import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { pingPong } from "./ping-pong";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const pingPongResponse = pingPong(JSON.parse(event.body));
  if (pingPongResponse != null) {
    return {
      statusCode: 200,
      body: JSON.stringify(pingPongResponse),
    };
  }
};