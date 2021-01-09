import { ValidatedEventAPIGatewayProxyEvent, ValidatedAPIGatewayProxyEvent, formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { ResponseTypes } from "src/utils/response-types";
import { searchYoutube } from "src/utils/search-youtube";
import { verifySignature } from "src/utils/verify-signature";
import ytFunctionSchema from "src/utils/yt-function-schema";

const discordBotHandler: ValidatedEventAPIGatewayProxyEvent<typeof ytFunctionSchema> = async function (event: ValidatedAPIGatewayProxyEvent<typeof ytFunctionSchema>) {
  // verify Discord bot API key signature
  const isVerified = verifySignature(event);
  if (!isVerified) {
    return formatJSONResponse({ message: "Failed to verify signature." }, 401);
  }

  // check for Discord bot PING request.
  if (event.body.type === ResponseTypes.PONG) {
    return formatJSONResponse({ type: ResponseTypes.PONG });
  }

  return searchYoutube(event);
};

export const YtFunctionHandler = middyfy(discordBotHandler);

// export default {
//   handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
//   events: [
//     {
//       http: {
//         method: 'post',
//         path: 'yt',
//         integration: "LAMBDA",
//         request: {
//           schema: {
//             'application/json': ytFunctionSchema
//           }
//         }
//       }
//     }
//   ]
// }