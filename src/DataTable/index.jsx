import React, { useState, useEffect, useCallback } from "react";
import Pagination from "./Pagination";
import Row from "./Row";
import Search from "./Search";
import useSearch from "../hooks/use-search";
/*
  Component displaying the table based on the data provided and rowRenderKeys.
  Searching function included based on provided searchKeys
  Pagination included based on rowsAmount
*/
const DataTable = ({ data, searchKeys, rowsAmount, rowRenderKeys }) => {
  const [rowsPerPage] = useState(rowsAmount);
  const [rows, setRows] = useState(data);
  const [currentPageNumber, setCurrentPageNumber] = useState(0);

  // Using custom hook from hooks/use-search.js
  const { rowsFound, onSearch } = useSearch(data, searchKeys);

  // Counting the number of pages based on rendered rows per page
  const calculateTotalNumberOfPages = useCallback(
    (data) => {
      if (rowsPerPage === 0) return 0;
      return Math.ceil(data.length / rowsPerPage);
    },
    [rowsPerPage]
  );

  // Rerendering the content right after the change of the state
  useEffect(() => {
    setRows(rowsFound);
    setCurrentPageNumber(0);
    setTotalNumberOfPages(calculateTotalNumberOfPages(rowsFound));
  }, [rowsFound, calculateTotalNumberOfPages]);

  // Counting total number of pages based on all data from dataset
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(
    calculateTotalNumberOfPages(data)
  );

  // Changing the page number
  const changeToPageNumber = (pageNumber) => {
    setCurrentPageNumber(pageNumber);
  };

  const rowsInPageNumber = (pageNumber) => {
    const startIndex = pageNumber * rowsPerPage;
    return [startIndex, startIndex + rowsPerPage];
  };

  const rowsToRender = rows
    .map((row, i) => (
      <Row
        key={i}
        link={row[rowRenderKeys.link]}
        title={row[rowRenderKeys.title]}
        desc={row[rowRenderKeys.desc]}
      />
    ))
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

// Default values for props provided
DataTable.defaultProps = {
  rowsAmount: 40,
  searchKeys: ["name", "email"],
  rowRenderKeys: {
    title: "name",
    desc: "desc",
    link: "link",
  },
};

export default DataTable;
