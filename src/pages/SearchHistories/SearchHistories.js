import React from "react";
import Grid from "ui-lib/Grid";
import SearchHistory from "../SearchHistory";

const SearchHistories = ({ books }) => {
  return (
    <Grid
      items={books}
      noItemsMessage={"No Books Selected"}
      setKey={(item) => {
        return `cell-${item._id}-${Date.now()}`;
      }}
      renderItem={(book) => <SearchHistory {...book} />}
    ></Grid>
  );
};

export default SearchHistories;
