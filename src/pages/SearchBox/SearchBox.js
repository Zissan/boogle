import React, { useCallback, useState, useRef, useEffect } from "react";
import data from "tools/data.json";
import Autocomplete from "ui-lib/Autocomplete";
import Button from "ui-lib/Button";
import bookController from "api/controllers/bookController/bookController";

const SearchBox = () => {
  const controller = useRef(bookController());
  const [value, setValue] = useState("");
  const [books, setBooks] = useState([]);
  useEffect(() => {
    controller.current.add(data);
  }, []);
  const handleChange = ({ target }) => {
    setValue(target.value);
    const { books } = controller.current.searchSummary(target.value);
    if (!books) return;
    setBooks(books);
  };
  const handleReady = useCallback((inputHtml) => {
    inputHtml.focus();
  }, []);
  return (
    <div>
      <Autocomplete
        items={books}
        value={value}
        primaryKey={"_id"}
        onChange={handleChange}
        renderItem={(book) => {
          return (
            <>
              <label>
                <strong>{book.name}</strong>
              </label>
            </>
          );
        }}
        onReady={handleReady}
      />
      <Button />
    </div>
  );
};

export default SearchBox;
