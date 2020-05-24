import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "./Button";

let onClickSpy = null;
function renderButton(args) {
  const defaultProps = {
    onClick: () => {},
    htmlId: "btnSubmit",
  };

  const props = { ...defaultProps, ...args };
  onClickSpy = jest.spyOn(props, "onClick");
  return render(<Button {...props} />);
}

it("Should render Snapshot with button text, Submit.", () => {
  const tree = renderButton({ text: "Submit" });

  expect(tree).toMatchSnapshot();
});

it("Should render button text, Submit.", () => {
  // ARRANGE
  const { getByText } = renderButton({ text: "Submit" });

  // ACT
  const button = getByText("Submit");

  // ASSERT
  expect(button).toBeInTheDocument();
});

it("Should invoke onSelect with item value 1 on clicking the result with id, autocomplete-0", () => {
  // ARRANGE
  const { findByTestId } = renderButton({});

  // ACT
  findByTestId("btnSubmit").then((btnElement) => {
    fireEvent(
      btnElement,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(onClickSpy).toHaveBeenCalled();
  });
});
