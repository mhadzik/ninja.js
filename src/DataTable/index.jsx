import React, {useState} from 'react'
import Pagination from './Pagination'
import Row from './Row'
import Search from './Search'

const DataTable = ({rowss, rowsPerPage}) => {
  console.log(rowss)
  const [rows, setRows] = useState(rowss);
  const [currentPageNumber, setCurrentPageNumber] = useState(0);

  // defaultProps = {
  //   rowsPerPage: 40
  // }

  const calculateTotalNumberOfPages = (rowss) => {
    if (rowsPerPage === 0) return 0
    return Math.ceil(rowss.length / rowsPerPage)
  }

  const [totalNumberOfPages, setTotalNumberOfPages] = useState(calculateTotalNumberOfPages(rowss));

  const search = (event) => {
    const text = event.target.value
    let rowsFound = rowss

    if (text) {
      rowsFound = rowss.filter((row) => {
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
export default DataTable
