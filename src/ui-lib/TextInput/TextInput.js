import React from "react";
import PropTypes from "prop-types";

/** Text input with integrated label to enforce consistency in layout, error display, label placement, and required field marker. It is a Opinionated building block.*/
const TextInput = ({
  htmlId,
  name,
  type = "text",
  required = false,
  onChange,
  placeholder,
  value,
  error,
  children,
  forwardRef,
  ...props
}) => {
  return (
    <>
      <input
        id={htmlId}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={error && { border: "solid 1px red" }}
        ref={forwardRef}
        {...props}
      />
      {children}
      {error && (
        <div className="error" style={{ color: "red" }}>
          {error}
        </div>
      )}
    </>
  );
};

TextInput.propTypes = {
  /** Unique HTML ID. Used for tying label to HTML input. Handy hook for automated testing. */
  htmlId: PropTypes.string.isRequired,

  /** Input name. Recommend setting this to match object's property so a single change handler can be used. */
  name: PropTypes.string.isRequired,

  /** Input type */
  type: PropTypes.oneOf(["text", "number", "password"]),

  /** Mark label with asterisk if set to true */
  required: PropTypes.bool,

  /** Function to call onChange */
  onChange: PropTypes.func.isRequired,

  /** Placeholder to display when empty */
  placeholder: PropTypes.string,

  /** Value */
  value: PropTypes.any,

  /** String to display when error occurs */
  error: PropTypes.string,

  /** Child component to display next to the input */
  children: PropTypes.node,
};

export default TextInput;
