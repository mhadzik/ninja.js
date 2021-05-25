import React from 'react';
import DataTable from './DataTable';
import './App.css';
import PageContext from './context/page-context'

const App = ({rows}) => {

  let content = <div className="container mt-3">
    <PageContext>
      <DataTable rowsAmount={rows} locale="da"/>
    </PageContext>
  </div>

  return content;
}

export default App;
