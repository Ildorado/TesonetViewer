import { useAuth } from "@/hooks";
import { useCallback, useState } from "react";

interface IUseGetServersData {
  onUnauthorised?: () => void;
}
type DataType = { name: string; distance: number }[];

export const useGetServersData = ({
  onUnauthorised,
}: IUseGetServersData): [DataType | null, () => Promise<void>] => {
  const auth = useAuth();
  const [data, setData] = useState<DataType | null>(null);

  const getServersData = useCallback(async () => {
    try {
      if (auth?.user.token) {
        const response = await fetch(
          "https://playground.tesonet.lt/v1/servers",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${auth?.user.token}` },
          }
        );

        const result = await response.json();
        console.log("response:", response);

        if (response.status === 401) {
          onUnauthorised?.();
        }

        setData(result);
      }
    } catch (error) {
      console.log("error:", error);
    }
  }, []);
  return [data, getServersData];
};
