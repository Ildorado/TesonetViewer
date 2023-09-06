import { apiCaller } from "@/api";
import { useAuth } from ".";
import { useCallback } from "react";

export const useApiCaller = () => {
  const auth = useAuth();

  const onUnauthorised = useCallback(() => {
    auth?.logout();
  }, [auth]);

  const wrappedApiCaller: typeof apiCaller = useCallback(
    parameters => apiCaller({ ...parameters, onUnauthorised, token: auth?.user.token }),
    []
  );

  return wrappedApiCaller;
};
