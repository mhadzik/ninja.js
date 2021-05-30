import { useState, useCallback } from "react";
/*
  Custom hook for searching component
  Using data and searchKeys to filter the data based on input provided
*/
const useSearch = (data, searchKeys) => {
  const [rowsFound, setRowsFound] = useState(data);
  const onSearch = useCallback(
    (e) => {
      const text = e.target.value;
      let rows = data;

      if (text) {
        searchKeys.map(
          (key) =>
            (rows = data.filter((row) => {
              return row[key]?.toLowerCase().search(text.toLowerCase()) > -1;
            }))
        );
      }

      setRowsFound(rows);
    },
    [data, searchKeys]
  );

  return { rowsFound, onSearch };
};

export default useSearch;
