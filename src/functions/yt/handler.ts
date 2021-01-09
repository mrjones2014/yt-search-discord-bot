import 'source-map-support/register';
import { middyfy } from '@libs/lambda';
import { formatJSONResponse, ValidatedAPIGatewayProxyEvent, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import schema from './schema';
import { ResponseTypes } from 'src/utils/response-types';
import { verifySignature } from 'src/utils/verify-signature';
import { searchYoutube } from 'src/utils/search-youtube';

const discordBotHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event: ValidatedAPIGatewayProxyEvent<typeof schema>) => {
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

export const main = middyfy(discordBotHandler);