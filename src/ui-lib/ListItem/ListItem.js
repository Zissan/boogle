import React from "react";
import PropTypes from "prop-types";

const ListItem = ({
  htmlId,
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  onClick = () => {},
  classList = [],
  ...props
}) => {
  return (
    <div
      className={classList.join(" ")}
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
  onMouseEnter: PropTypes.func,

  /** Function to call onMouseLeave */
  onMouseLeave: PropTypes.func,

  /** Function to call onClick */
  onClick: PropTypes.func,

  /** Dynamic classes */
  classList: PropTypes.arrayOf(PropTypes.string),

  /** Child component to display next to the input */
  children: PropTypes.node,
};

export default ListItem;
