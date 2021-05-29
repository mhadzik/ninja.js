import React from "react";
import DataTable from "./DataTable";
import "./App.css";

const App = ({ data }) => {
  const dataKeys = Object.keys(Object.assign({}, ...data));
  const rowKeys = Object.keys(Object.assign({}, ...data)).slice(0, 3);
  const rowRenderKeys = {
    title: rowKeys[0],
    desc: rowKeys[1],
    link: rowKeys[2],
  };

  let content = (
    <div className="container mt-3">
      <DataTable
        data={data}
        locale="da"
        searchKeys={dataKeys.slice(0, 2)}
        rowsAmount={5}
        rowRenderKeys={rowRenderKeys}
      />
    </div>
  );

  return content;
};

export default App;
