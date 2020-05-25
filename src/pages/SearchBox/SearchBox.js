import React, { useCallback, useState, useRef, useEffect } from "react";
import data from "tools/data.json";
import Autocomplete from "ui-lib/Autocomplete";
import Button from "ui-lib/Button";
import bookController from "api/controllers/bookController/bookController";

const SearchBox = ({ onSubmit }) => {
  const controller = useRef(bookController());
  const [value, setValue] = useState("");
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);
  useEffect(() => {
    controller.current.add(data);
  }, []);
  const handleChange = ({ target }) => {
    setValue(target.value);
    setBook(null);
    const { books } = controller.current.searchSummary(target.value);
    if (!books) return;
    setBooks(books);
  };
  const handleReady = useCallback((inputHtml) => {
    inputHtml.focus();
  }, []);

  const handleSelect = (book) => {
    setBook(book);
    if (!book) return;
    setValue(book.name);
  };

  const handleReset = () => {
    setValue("");
    setBook(null);
    setBooks([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(book);
    handleReset();
  };
  return (
    <form onSubmit={handleSubmit} role="search" className="form">
      <Autocomplete
        items={books}
        value={value}
        primaryKey={"_id"}
        onChange={handleChange}
        renderItem={(book) => {
          return <>{book.name}</>;
        }}
        onReady={handleReady}
        onSelect={handleSelect}
        noResultText="No Book Found"
        reset={handleReset}
        aria-label="search text"
      />
      <Button text={"Submit"} value="Search" classList={["btn"]} />
    </form>
  );
};

export default SearchBox;
