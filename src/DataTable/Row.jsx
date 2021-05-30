import React from "react";

const Row = ({ link, title, desc }) => {

  return (

    <tr>
      <td>
        <a href={link}>{title}</a>
        <br />
        <small>{desc}</small>
      </td>
    </tr>
  );
};

export default Row;
