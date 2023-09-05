import { useGetServersData } from "@/api/useGetServersData";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ServersPage = () => {
  const navigate = useNavigate();

  const onUnauthorised = useCallback(() => {
    window.localStorage.removeItem("user");
    navigate("/login");
  }, []);

  const [data, getServersData] = useGetServersData({
    onUnauthorised,
  });

  useEffect(() => {
    getServersData?.();
  }, []);

  console.log("data:", data);

  return (
    <div>
      {data?.map((element) => {
        return (
          <div>
            <p>name: {element.name}</p>
            <p>distance: {element.distance}</p>
          </div>
        );
      })}
    </div>
  );
};
