export enum ResponseTypes {
  PONG = 1,
  ACK_NO_SOURCE = 2,
  MESSAGE_NO_SOURCE = 3,
  MESSAGE_WITH_SOURCE = 4,
  ACK_WITH_SOURCE = 5,
}

export type DiscordResponseBody = {
  tts: boolean;
  content: string,
  embeds: Array<string>,
  allowed_mentions: Array<string>,
}

export type DiscordResponse = {
  type: ResponseTypes,
  data?: DiscordResponseBody,
}
