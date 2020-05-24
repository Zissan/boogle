import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Autocomplete from "./Autocomplete";

let onSelectSpy = null;
let selected;
function renderAutocomplete(args) {
  const defaultProps = {
    onChange: () => {},
    onSelect: (item) => {
      selected = item;
    },
    name: "txtAutocomplete",
    htmlId: "txtAutocomplete",
  };

  const props = { ...defaultProps, ...args };
  onSelectSpy = jest.spyOn(props, "onSelect");
  return render(<Autocomplete {...props} />);
}

it("Should render results, with two ids, autocomplete-0, autocomplete-1, in the Snapshot.", () => {
  const tree = renderAutocomplete({ items: [1, 2] });

  expect(tree).toMatchSnapshot();
});

it("Should render results, with ids, autocomplete-0, in the Snapshot.", () => {
  const { findByTestId } = renderAutocomplete({ items: [1, 2] });
  findByTestId("autocomplete-0").then((resultElement) => {
    expect(resultElement.id).toBe("autocomplete-0");
  });
});

it("Should invoke onSelect with item value 1 on clicking the result with id, autocomplete-0", () => {
  const { findByTestId } = renderAutocomplete({ items: [1, 2] });
  findByTestId("autocomplete-0").then((resultElement) => {
    fireEvent(
      resultElement,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(onSelectSpy).toHaveBeenCalled();
    expect(selected).toBe(1);
  });
});
