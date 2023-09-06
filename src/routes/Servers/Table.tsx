import React, { useState } from "react";

interface ITable<T> {
  data: T[];
}

export const Table = <T extends Record<string, unknown>>({ data }: ITable<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "asc" | "desc" | null;
  }>({
    key: null,
    direction: null,
  });

  const keys = Object.keys(data[0]);

  const sortedData = [...data];

  if (sortConfig.key) {
    sortedData.sort((a, b) => {
      const aValue = Number(a[sortConfig.key as keyof T]);
      const bValue = Number(b[sortConfig.key as keyof T]);

      if (!isNaN(aValue) && !isNaN(bValue)) {
        if (sortConfig.direction === "asc") {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      }

      // If the values are not numbers, fallback to sorting as strings
      const aString = a[sortConfig.key as keyof T] as string;
      const bString = b[sortConfig.key as keyof T] as string;

      if (sortConfig.direction === "asc") {
        return aString.localeCompare(bString);
      } else {
        return bString.localeCompare(aString);
      }
    });
  }

  const requestSort = (key: string | null) => {
    if (sortConfig.key === key) {
      // If clicking on the same column, toggle direction
      if (sortConfig.direction === "asc") {
        setSortConfig({ key, direction: "desc" }); // Toggle to descending
      } else if (sortConfig.direction === "desc") {
        setSortConfig({ key: null, direction: null }); // Toggle to original order
      } else {
        setSortConfig({ key, direction: "asc" }); // Toggle to ascending
      }
    } else {
      // If clicking on a different column, set to ascending
      setSortConfig({ key, direction: "asc" });
    }
  };

  return (
    <div className="flex flex-col overflow-x-auto" data-test="table">
      <div>
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium">
                <tr className="cursor-pointer">
                  {keys.map((key, index) => (
                    <th
                      data-test="table-header-column"
                      key={key}
                      scope="col"
                      className={`px-6 py-4 ${sortConfig.key === key ? "text-blue-500" : ""} ${
                        index === keys.length - 1 ? "fixed-width" : ""
                      }`}
                      onClick={() => requestSort(key)}
                    >
                      <div className="flex items-center">
                        <span className="mr-1">{key}</span>
                        {sortConfig.key === key ? (
                          <span
                            className={`${
                              sortConfig.direction === "asc" ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {sortConfig.direction === "asc" ? "▲" : "▼"}
                          </span>
                        ) : (
                          <span className="text-transparent">▲</span> // Add empty placeholder
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedData.map((element, index) => (
                  <tr data-test="table-column" className="border-b" key={index}>
                    {keys.map(key => (
                      <td
                        data-test={`table-${key}-cell`}
                        className="whitespace-nowrap px-6 py-4"
                        key={key}
                      >
                        {element[key] as React.ReactNode}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
