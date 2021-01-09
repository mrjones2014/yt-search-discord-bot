import { ResponseTypes } from "src/utils/response-types";

export default {
  type: "object",
  properties: {
    type: { type: "number" },
    query: { type: "string" },
  },
  required: ["type"],
} as const;
