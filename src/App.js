import React, { useState } from "react";
import "./App.css";
import SearchBox from "./pages/SearchBox";
import SearchHistories from "./pages/SearchHistories";

function App() {
  const [books, setBooks] = useState([]);
  const handleSubmit = (book) => {
    if (!book) return;
    setBooks([...books, book]);
  };
  return (
    <div className="App">
      <SearchBox onSubmit={handleSubmit} />
      <SearchHistories books={books} />
    </div>
  );
}

export default App;
