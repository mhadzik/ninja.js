import React from 'react';
import DataTable from './DataTable';
import './App.css';
import PageContext from './context/page-context'

const App = ({data}) => {

  const dataKeys = Object.keys(Object.assign({}, ...data))

  let content = <div className="container mt-3">
    <PageContext>
      <DataTable data={data} locale="da" searchKeys={dataKeys.slice(0,2)} />
    </PageContext>
  </div>

  return content;
}

export default App;
