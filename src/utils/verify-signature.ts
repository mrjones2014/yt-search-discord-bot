import { APIGatewayProxyEvent } from "aws-lambda";
import * as NACL from "tweetnacl";

enum Headers {
  Signature = "X-Signature-Ed25519",
  Timestamp = "X-Signature-Timestamp",
}

const cantVerifyResult = () => {
  throw new Error("Cannot verify signature.");
};

export const verifySignature = (event: APIGatewayProxyEvent) => {
  if (event.body == null) {
    cantVerifyResult();
  }

  const signature = event.headers[Headers.Signature];
  const timestamp = event.headers[Headers.Timestamp];

  const isVerified = NACL.sign.detached.verify(
    Buffer.from(timestamp + event.body),
    Buffer.from(signature, "hex"),
    Buffer.from(process.env.DISCORD_API_KEY, "hex"),
  );

  if (!isVerified) {
    cantVerifyResult();
  }
};
