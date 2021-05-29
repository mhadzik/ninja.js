import { useState, useCallback } from "react";

const useSearch = (data, searchKeys) => {
  const [rowsFound, setRowsFound] = useState(data);
  const onSearch = useCallback(
    (e) => {
      const text = e.target.value;
      let rows = data;

      if (text) {
        searchKeys.map(
          (key) =>
            (rows = data.filter(
              (row) => row[key]?.toLowerCase().search(text.toLowerCase()) > -1
            ))
        );
      }

      setRowsFound(rows);
    },
    [data, searchKeys]
  );

  return { rowsFound, onSearch };
};

export default useSearch;
