import 'source-map-support/register';
import { formatJSONResponse, ValidatedAPIGatewayProxyEvent, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import schema from '../utils/schema';
import { ResponseTypes } from 'src/utils/response-types';
import { verifySignature } from 'src/utils/verify-signature';
import { searchYoutube } from 'src/utils/search-youtube';

const discordBotHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async function (event: ValidatedAPIGatewayProxyEvent<typeof schema>) {
  if (typeof event.body === "string") {
    event.body = JSON.parse(event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString() : event.body);
  }
  // verify Discord bot API key signature
  const verificationResult = verifySignature(event);
  if (verificationResult != null) {
    return verificationResult;
  }

  // check for Discord bot PING request.
  if (event.body.type === ResponseTypes.PONG) {
    return formatJSONResponse({ type: ResponseTypes.PONG });
  }

  return searchYoutube(event);
};

export const main = discordBotHandler;