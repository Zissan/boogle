import React from "react";
import Grid from "ui-lib/Grid";
import SearchHistory from "../SearchHistory";

const SearchHistories = ({ books }) => {
  return (
    <Grid
      items={books}
      noItemsMessage={() => (
        <div className="grid__no_item_message">No Books Selected</div>
      )}
      setKey={(item) => {
        return `cell-${item._id}-${Date.now()}`;
      }}
      renderItem={(book) => <SearchHistory {...book} />}
    ></Grid>
  );
};

export default SearchHistories;
