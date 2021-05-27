import React, {useContext, useState} from 'react'
import Pagination from './Pagination'
import Row from './Row'
import {PageContext} from '../context/page-context'
import Search from './Search'

const DataTable = ({data, searchKeys}) => {
  console.log(data, searchKeys)
  const rowsPerPage = useContext(PageContext).rowsPerPage
  const [rows, setRows] = useState(data);
  const [currentPageNumber, setCurrentPageNumber] = useState(0);

  const calculateTotalNumberOfPages = (data) => {
    if (rowsPerPage === 0) return 0
    return Math.ceil(data.length / rowsPerPage)
  }

  const [totalNumberOfPages, setTotalNumberOfPages] = useState(calculateTotalNumberOfPages(data));

  const search = (event) => {
    const text = event.target.value
    let rowsFound = data

    if (text) {
      searchKeys.map(key=> rowsFound = data.filter((row) => row[key]?.toLowerCase().search(text.toLowerCase()) > -1)
      )
    }

    setRows(rowsFound);
    setCurrentPageNumber(0);
    setTotalNumberOfPages(calculateTotalNumberOfPages(rowsFound));
  }

  const changeToPageNumber = (pageNumber) => {
    setCurrentPageNumber(pageNumber)
  }

  const rowsInPageNumber = (pageNumber) => {
    const startIndex = pageNumber * rowsPerPage
    return [startIndex, startIndex + rowsPerPage]
  }


    const rowsToRender = rows
      .map((row,i) => <Row key={i} row={row} />)
      .slice(...rowsInPageNumber(currentPageNumber))

    return(
      <div>
        <Search onSearch={search} />
        <table>
          <tbody>
            { rowsToRender }
          </tbody>
        </table>
        <Pagination
          currentPageNumber={currentPageNumber}
          totalNumberOfPages={totalNumberOfPages}
          onChange={changeToPageNumber} />
      </div>
    )
}

DataTable.defaultProps = {
  rowsPerPage: 40
}

export default DataTable
