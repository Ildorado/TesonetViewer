import { apiMapType, apiRecord } from "@/types";

export const API_DEFINITION_MAP: Record<
  keyof apiMapType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (payload: any) => apiRecord
> = {
  postToken: (payload: apiMapType["postToken"]["request"]) => ({
    method: "POST",
    url: `https://playground.tesonet.lt/v1/tokens`,
    payload,
    isSendingAuthToken: false,
  }),
  getServers: (payload: apiMapType["getServers"]["request"]) => ({
    method: "GET",
    url: `https://playground.tesonet.lt/v1/servers`,
    payload,
  }),
};
