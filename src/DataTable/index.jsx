import React, {useContext, useState} from 'react'
import Pagination from './Pagination'
import Row from './Row'
import {PageContext} from '../context/page-context'
import Search from './Search'

const DataTable = ({rowsAmount}) => {
  console.log(rowsAmount)
  const rowsPerPage = useContext(PageContext).rowsPerPage
  const [rows, setRows] = useState(rowsAmount);
  const [currentPageNumber, setCurrentPageNumber] = useState(0);

  const calculateTotalNumberOfPages = (rowsAmount) => {
    if (rowsPerPage === 0) return 0
    return Math.ceil(rowsAmount.length / rowsPerPage)
  }

  const [totalNumberOfPages, setTotalNumberOfPages] = useState(calculateTotalNumberOfPages(rowsAmount));

  const search = (event) => {
    const text = event.target.value
    let rowsFound = rowsAmount

    if (text) {
      rowsFound = rowsAmount.filter((row) => {
        return row.name1.toLowerCase().search(text.toLowerCase()) > -1 ||
         (row.email && row.email.toLowerCase().search(text.toLowerCase()) > -1)
      })
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
      .map(row => <Row key={row.per_id} row={row} />)
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
