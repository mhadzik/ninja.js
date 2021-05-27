import React from 'react';
import DataTable from './DataTable';
import './App.css';

const App = ({data}) => {

  const dataKeys = Object.keys(Object.assign({}, ...data))

  let content = <div className="container mt-3">
      <DataTable data={data} locale="da" searchKeys={dataKeys.slice(0,2)} rowsAmount={5}/>
  </div>

  return content;
}

export default App;
