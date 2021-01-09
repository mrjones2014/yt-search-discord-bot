export type PingPongResponse = { type: 1 };

export const pingPong = (body: any): PingPongResponse | undefined => {
  if (body.type === "1" || body.type === 1) {
    return { type: 1 };
  }

  return undefined;
};
