import React from "react";
import PropTypes from "prop-types";

const ListItem = ({
  htmlId,
  onMouseEnter,
  onMouseLeave,
  onClick,
  ...props
}) => {
  return (
    <div
      className="autocomplete__result"
      tabIndex="0"
      id={htmlId}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {props.children}
    </div>
  );
};

ListItem.propTypes = {
  /** Unique HTML ID. Handy hook for automated testing. */
  htmlId: PropTypes.string,

  /** Function to call onChange */
  onMouseEnter: PropTypes.func.isRequired,

  /** Function to call onChange */
  onMouseLeave: PropTypes.func.isRequired,

  /** Child component to display next to the input */
  children: PropTypes.node,
};

export default ListItem;
