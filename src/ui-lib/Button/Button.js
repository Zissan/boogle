import React from "react";
import PropTypes from "prop-types";

const Button = ({
  onClick = () => {},
  classList = [],
  text,
  type = "submit",
  htmlId,
  ...props
}) => {
  return (
    <button
      className={classList.join(" ")}
      onClick={onClick}
      type={type}
      {...props}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  /** Unique HTML ID. Used for tying label to HTML input. Handy hook for automated testing. */
  htmlId: PropTypes.string.isRequired,

  /** Input type */
  type: PropTypes.oneOf(["submit", "button", "reset"]),

  /** Function to call onClick */
  onClick: PropTypes.func,

  /** Text to display */
  text: PropTypes.string,

  /** Css Classes */
  classList: PropTypes.arrayOf(PropTypes.string),
};

export default Button;
