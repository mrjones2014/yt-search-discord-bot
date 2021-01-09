import { ValidatedAPIGatewayProxyEvent } from "@libs/apiGateway";
import ytFunctionSchema from "src/utils/yt-function-schema";
import * as NACL from "tweetnacl";

enum Headers {
  Signature = "X-Signature-Ed25519",
  Timestamp = "X-Signature-Timestamp",
}

export const verifySignature = function (event: ValidatedAPIGatewayProxyEvent<typeof ytFunctionSchema>): boolean {
  try {
    if (event.body == null) {
      return false;
    }

    const signature = event.headers[Headers.Signature];
    const timestamp = event.headers[Headers.Timestamp];

    return NACL.sign.detached.verify(
      Buffer.from(timestamp + JSON.stringify(event.body)),
      Buffer.from(signature, "hex"),
      Buffer.from(process.env.DISCORD_API_KEY, "hex"),
    );
  } catch (e) {
    return false;
  }
};
