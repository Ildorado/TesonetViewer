import { useCallback } from "react";
import { useAuth } from "@/hooks";
import { useQuery } from "@tanstack/react-query";

export const useQueryServers = () => {
  const auth = useAuth();

  const onUnauthorised = useCallback(() => {
    auth?.logout();
  }, []);

  const { isLoading, error, data } = useQuery({
    queryKey: ["servers"],
    queryFn: async () => {
      const response = await fetch("https://playground.tesonet.lt/v1/servers", {
        method: "GET",
        headers: { Authorization: `Bearer ${auth?.user.token}` },
      });
      if (response.status === 401) {
        onUnauthorised();
        return;
      }

      return await response.json();
    },
  });

  return { isLoading, error, data };
};
