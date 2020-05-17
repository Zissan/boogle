import React from "react";
import "./App.css";
import SearchBox from "./pages/SearchBox";
import SearchHistory from "./pages/SearchHistory";

function App() {
  return (
    <div className="App">
      <SearchBox />
      <SearchHistory />
    </div>
  );
}

export default App;
