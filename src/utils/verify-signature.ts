import { formatJSONResponse, ValidatedAPIGatewayProxyEvent } from "@libs/apiGateway";
import schema from "src/utils/schema";
import { verifyKey } from "discord-interactions";
enum Headers {
  Signature = "X-Signature-Ed25519",
  Timestamp = "X-Signature-Timestamp",
}

export const verifySignature = function (event: ValidatedAPIGatewayProxyEvent<typeof schema>) {
  try {
    if (event.body == null) {
      return formatJSONResponse({ message: "Request signature invalid (no request body)." }, 401);
    }

    const signature = event.headers[Headers.Signature];
    const timestamp = event.headers[Headers.Timestamp];

    const isValid = verifyKey(JSON.stringify(event.body), signature, timestamp, process.env.DISCORD_PUBLIC_KEY);
    if (isValid) {
      return undefined;
    }

    return formatJSONResponse({ message: "Request signature invalid." }, 401);
  } catch (e) {
    return formatJSONResponse({
      message: "Something went really, really wrong verifying the request signature.",
      error: e,
    }, 401);
  }
};
