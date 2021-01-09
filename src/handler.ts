import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as yt from "youtube-search-without-api-key";
import { DiscordResponse, ResponseTypes } from "./response-types";

export const handleRequest = async (event: APIGatewayProxyEvent): APIGatewayProxyResult => {
  const body = JSON.parse(event.body);
  if (body.query == null || typeof body.query !== "string") {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "No query provided." }),
    };
  }

  const query = body.query;
  const videos = await yt.search(query);
  if (videos == null || videos.length === 0) {
    const result: DiscordResponse = {
      type: ResponseTypes.MESSAGE_NO_SOURCE,
      data: {
        tts: false,
        content: "No results!",,
        embeds: [],
        allowed_mentions: [],
      },
    };

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    }
  }

  const firstResult = videos[0].url;
  const result: DiscordResponse = {
    type: ResponseTypes.MESSAGE_NO_SOURCE,
    data: {
      tts: false,
      content: `🚀 Okay, this is epic.
      ${firstResult}`,
      embeds: [],
      allowed_mentions: [],
    },
  };
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

