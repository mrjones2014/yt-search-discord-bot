import { APIGatewayProxyEvent } from "aws-lambda";

const verifySignature = (event: APIGatewayProxyEvent) => {
  const signature = event.headers["x-signature-ed25519"];
  const timestamp = event.headers["x-signature-timestamp"];
  const message = sign
};