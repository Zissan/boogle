import React from "react";
import Autocomplete from "ui-lib/Autocomplete";
import Button from "ui-lib/Button";
import Trie from "lib/Trie";

const SearchBox = () => {
  const db = new Trie();
  db.add("HELLO", 1);
  db.add("HELLO", 2);
  db.add("HE", 1);
  return (
    <div>
      {db.getValues("HELLO").join(",")}
      <Autocomplete />
      <Button />
    </div>
  );
};

export default SearchBox;
