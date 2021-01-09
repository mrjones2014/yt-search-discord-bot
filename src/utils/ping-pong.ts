import { DiscordResponse, ResponseTypes } from "./response-types";

export const pingPong = (body: any): DiscordResponse | undefined => {
  if (body.type === "1" || body.type === 1) {
    return { type: ResponseTypes.PONG };
  }

  return undefined;
};