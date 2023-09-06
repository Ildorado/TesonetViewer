import { useApiCaller } from "@/hooks";
import { useQuery } from "@tanstack/react-query";

export const useQueryServers = () => {
  const apiCaller = useApiCaller();

  const { isLoading, error, data } = useQuery({
    queryKey: ["servers"],
    queryFn: async () => {
      return await apiCaller({ type: "getServers", params: undefined });
    },
    refetchOnWindowFocus: false,
  });

  return { isLoading, error, data };
};
