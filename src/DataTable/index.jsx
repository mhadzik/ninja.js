import React, { useState, useEffect, useCallback } from "react";
import Pagination from "./Pagination";
import Row from "./Row";
import Search from "./Search";
import useSearch from "../hooks/use-search";

const DataTable = ({ data, searchKeys, rowsAmount }) => {
  const [rowsPerPage] = useState(rowsAmount);
  const [rows, setRows] = useState(data);
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const { rowsFound, onSearch } = useSearch(data, searchKeys);

  const calculateTotalNumberOfPages = useCallback(
    (data) => {
      if (rowsPerPage === 0) return 0;
      return Math.ceil(data.length / rowsPerPage);
    },
    [rowsPerPage]
  );

  useEffect(() => {
    setRows(rowsFound);
    setCurrentPageNumber(0);
    setTotalNumberOfPages(calculateTotalNumberOfPages(rowsFound));
  }, [rowsFound, calculateTotalNumberOfPages]);

  const [totalNumberOfPages, setTotalNumberOfPages] = useState(
    calculateTotalNumberOfPages(data)
  );

  const changeToPageNumber = (pageNumber) => {
    setCurrentPageNumber(pageNumber);
  };

  const rowsInPageNumber = (pageNumber) => {
    const startIndex = pageNumber * rowsPerPage;
    return [startIndex, startIndex + rowsPerPage];
  };

  const rowsToRender = rows
    .map((row, i) => <Row key={i} row={row} />)
    .slice(...rowsInPageNumber(currentPageNumber));

  return (
    <div>
      <Search onSearch={onSearch} />
      <table>
        <tbody>{rowsToRender}</tbody>
      </table>
      <Pagination
        currentPageNumber={currentPageNumber}
        totalNumberOfPages={totalNumberOfPages}
        onChange={changeToPageNumber}
      />
    </div>
  );
};

DataTable.defaultProps = {
  rowsPerPage: 40,
};

export default DataTable;
