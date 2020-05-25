import React, { useState } from "react";
import "./App.css";
import SearchBox from "./pages/SearchBox";
import SearchHistories from "./pages/SearchHistories";

function App() {
  const [books, setBooks] = useState([]);
  const handleSubmit = (book) => {
    if (!book) return;
    const newBooks = [...books, book];
    setBooks([...newBooks]);
  };
  return (
    <div className="App">
      <h1>Search Books</h1>
      <SearchBox onSubmit={handleSubmit} />
      <SearchHistories books={books} />
    </div>
  );
}

export default App;
