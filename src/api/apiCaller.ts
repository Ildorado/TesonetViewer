import { API_DEFINITION_MAP } from "@/constants";
import { apiMapType } from "@/types";

export const apiCaller = async <CallType extends keyof apiMapType>({
  type,
  params,
  onUnauthorised,
  token,
}: {
  type: CallType;
  params: apiMapType[CallType]["request"];
  onUnauthorised?: () => void;
  token?: string;
}): Promise<{
  result?: apiMapType[CallType]["response"];
  success: boolean;
}> => {
  const {
    method,
    url,
    payload,
    isSendingAuthToken = true,
  } = API_DEFINITION_MAP[type](params);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (isSendingAuthToken) {
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else {
      return { success: false };
    }
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: payload ? JSON.stringify(payload) : undefined,
    });

    if (response.status === 401) {
      onUnauthorised?.();
      return { success: false };
    }

    const result = await response.json();
    console.log("Success:", result);

    return { result, success: true };
  } catch (error) {
    console.error("Error:", error);
    return { success: false };
  }
};
