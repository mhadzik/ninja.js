import React, {useState} from "react";

export const PageContext = React.createContext({
    rowsPerPage: 5
});

export default props => {
    const [rowsPerPage, setRowsPerPage] = useState(5);


    return <PageContext.Provider value={{rowsPerPage, setRowsPerPage}}>
        {props.children}
    </PageContext.Provider>
}