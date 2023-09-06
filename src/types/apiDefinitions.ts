import { GetServersResponseType, PostTokenResponseType, PostTokenType } from "./api";

export type apiMapType = {
  postToken: { request: PostTokenType; response: PostTokenResponseType };
  getServers: { request: undefined; response: GetServersResponseType };
};

type HttpMethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";

export type apiRecord = {
  method: HttpMethodType;
  url: string;
  payload: unknown;
  isSendingAuthToken?: boolean;
};
