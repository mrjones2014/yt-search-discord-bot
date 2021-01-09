import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import 'source-map-support/register';
import schema from './schema';
import * as yt from "youtube-search-without-api-key";
import { DiscordResponse, ResponseTypes } from 'src/utils/response-types';
import { middyfy } from '@libs/lambda';

const formatSuccessMessage = (url: string) =>
`🚀 Okay, this is epic.
${url}`;

const ytSearch: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  if (
    event.body.query == null ||
    typeof event.body.query !== "string" ||
    event.body.query.length < 1
  ) {
    const result: DiscordResponse = {
      type: ResponseTypes.MESSAGE_NO_SOURCE,
      data: {
        tts: false,
        content: "🤔 You gotta actually search for something my dude.",
        embeds: [],
        allowed_mentions: [],
      }
    }
    return formatJSONResponse(result, 400);
  }

  const query = event.body.query;
  const videos = await yt.search(query);
  if (videos == null || videos.length < 1) {
    const result: DiscordResponse = {
      type: ResponseTypes.MESSAGE_NO_SOURCE,
      data: {
        tts: false,
        content: "😭 No results fam.",
        embeds: [],
        allowed_mentions: [],
      }
    };
    return formatJSONResponse(result);
  }

  const result: DiscordResponse = {
    type: ResponseTypes.MESSAGE_NO_SOURCE,
    data: {
      tts: false,
      content: formatSuccessMessage(videos[0].url),
      embeds: [],
      allowed_mentions: [],
    }
  };
  return formatJSONResponse(result);
}

export const main = middyfy(ytSearch);
