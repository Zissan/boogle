import React from "react";

const Cell = ({ classList, children }) => {
  return (
    <div role="gridcell" className={classList.join(" ")}>
      {children}
    </div>
  );
};

export default Cell;
