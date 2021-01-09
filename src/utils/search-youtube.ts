import { formatJSONResponse, ValidatedAPIGatewayProxyEvent } from "@libs/apiGateway";
import { getFirstYoutubeResult } from "src/utils/get-first-youtube-result";
import { DiscordResponse, ResponseTypes } from "src/utils/response-types";
import ytFunctionSchema from "src/utils/yt-function-schema";

const formatSuccessMessage = (url: string) =>
`🚀 Okay, this is epic.
${url}`;

export const searchYoutube = async function (event: ValidatedAPIGatewayProxyEvent<typeof ytFunctionSchema>) {
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
  const firstVideoLink = await getFirstYoutubeResult(query);
  if (firstVideoLink == null) {
    const result: DiscordResponse = {
      type: ResponseTypes.MESSAGE_NO_SOURCE,
      data: {
        tts: false,
        content: `😭 No results fam. You searched for: ${query}`,
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
      content: formatSuccessMessage(firstVideoLink),
      embeds: [],
      allowed_mentions: [],
    }
  };
  return formatJSONResponse(result);
}