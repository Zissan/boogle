import React from "react";
import PropTypes from "prop-types";

const SearchHistory = ({ name, summary, author, _id }) => {
  return (
    <div
      tabIndex="0"
      id={`history__block__${_id}__${Date.now()}`}
      className={`history__block`}
      aria-labelledby={`history__block__${_id}__${Date.now()}--name`}
      aria-describedby={`history__block__${_id}__${Date.now()}--summary`}
    >
      <h2
        id={`history__block__${_id}__${Date.now()}--name`}
        className={`history__block--name`}
      >
        {name}
      </h2>
      <p
        id={`history__block__${_id}__${Date.now()}--summary`}
        className={`history__block--summary`}
      >
        {`${summary.slice(0, 149)} ...`}
      </p>
      <hr />
      <p aria-label={`author ${author}`} className={`history__block--author`}>
        {author}
      </p>
    </div>
  );
};

SearchHistory.propTypes = {
  /** Unique HTML ID. Handy hook for automated testing. */
  name: PropTypes.string,

  /** Function to call onChange */
  summary: PropTypes.func.isRequired,

  /** Function to call onChange */
  author: PropTypes.func.isRequired,

  /** Child component to display next to the input */
  _id: PropTypes.number,
};

export default SearchHistory;
