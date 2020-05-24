import React from "react";
import PropTypes from "prop-types";
import Cell from "ui-lib/Cell";

const Grid = ({
  items = [],
  renderItem = (item) => item,
  setKey = (item, index) => index,
  noItemsMessage = "No items.",
}) => {
  return (
    <>
      <div className={"row"} role="grid">
        {items.map((item, idx, arr) => {
          let desktopCellSize = 4;
          if ((idx === arr.length - 3 && idx % 3 === 0) || arr.length === 2) {
            desktopCellSize = 6;
          }
          if ((idx === arr.length - 2 && idx % 3 === 0) || arr.length === 1) {
            desktopCellSize = 12;
          }
          return (
            <Cell
              classList={[`col-6`, `col-md-${desktopCellSize}`]}
              key={setKey(item, idx)}
            >
              {renderItem(item)}
            </Cell>
          );
        })}
      </div>
      {items.length ? null : <div role="alert">{noItemsMessage}</div>}
    </>
  );
};

Grid.propTypes = {
  /** Contain data for a Cell to be rendered under the grid */
  items: PropTypes.array,
  /** Describes the way how you render a cell */
  renderItem: PropTypes.func,
  /**  */
  noItemsMessage: PropTypes.string,
};

export default Grid;
