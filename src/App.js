import React from 'react';
import DataTable from './DataTable';
import './App.css';

const App = (props) => {

  let content = <div className="container mt-3">
    <DataTable rowss={props.rows} locale="da" rowsPerPage={5} />
  </div>

  return content;
}

export default App;
