import { Table } from "./Table";
import { Loader } from "@/components";
import { useQueryServers } from "./hooks";

export const ServersPage = () => {
  const { isLoading, error, data } = useQueryServers();

  if (isLoading) return <Loader />;

  if (error) return "An error has occurred: " + (error as Error).message;

  return <div className="w-96">{data?.result && <Table data={data.result} />}</div>;
};
