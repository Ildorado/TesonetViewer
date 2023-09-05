import { useGetServersData } from "@/api/useGetServersData";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "./Table";

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

  return <div className="w-96">{data && <Table data={data} />}</div>;
};
