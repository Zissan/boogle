import React, { useRef, useEffect } from "react";
import { KEYS } from "./keys";
import ListItem from "ui-lib/ListItem";
import { getOffset, getIndexFromID } from "ui-lib/utils";

/**
 *
 * @param {*} Component : Any text input component can be converted to auto complete by
 * passing through this HOC. Here in this case SearchBox component is passed through withAutocomplete.
 * ON PRESSING [ESC] ITEM LIST CAN BE CLOSED
 */
export const withAutomcomplete = (Component) => {
  return ({
    items = [],
    renderItem,
    primaryKey,
    onReady = (htmlInput, htmlDiv) => {},
    onSelect = (item) => {},
    noResultText = "No items matches the result.",
    reset = () => {},
    itemIdPrefix = "autocomplete-",
    ...props
  }) => {
    const resultsRef = useRef(null);
    const inputRef = useRef(null);
    const currentChildrenIndex = useRef(0);
    const filteredItemsRef = useRef([]);

    // const items = useFilter(items, props.value);

    useEffect(() => {
      const resultsRefConst = resultsRef.current;
      const inputRefConst = inputRef.current;
      resultsRef.current.addEventListener("keydown", handleResultsKeydown);
      inputRef.current.addEventListener("keydown", handleInputKeydown);
      inputRef.current.addEventListener("focus", handleInputFocus);
      resultsRef.current.style.width = inputRef.current.style.width;
      onReady(inputRef.current, resultsRef.current);
      document.addEventListener("keydown", hideResultList);
      return () => {
        resultsRefConst.removeEventListener("keydown", handleResultsKeydown);
        inputRefConst.removeEventListener("keydown", handleInputKeydown);
        inputRefConst.removeEventListener("focus", handleInputFocus);
        document.removeEventListener("click", hideResultList);
      };
    }, []);

    useEffect(() => {
      filteredItemsRef.current = items;
      if (items.length) {
        if (resultsRef.current.classList.contains("hide")) {
          resultsRef.current.classList.remove("hide");
        }
        const { children } = resultsRef.current;
        if (
          currentChildrenIndex.current &&
          children[currentChildrenIndex.current]
        ) {
          children[currentChildrenIndex.current].classList.remove("active");
        }
        currentChildrenIndex.current = 0;
      }
    }, [items]);

    /**
     * COMMON EVENTS FOR MOUSE AND KEYBOARD EVENTS STARTS HERE
     */
    const hideResultList = (event) => {
      const key = event.key.toUpperCase();
      if (key !== KEYS.ESCAPE) return;
      if (!resultsRef.current.classList.contains("hide")) {
        resultsRef.current.classList.add("hide");
      }
    };

    const handleInputFocus = (event) => {
      const { left, top } = getOffset(inputRef.current);
      resultsRef.current.style.left = left;
      resultsRef.current.style.top = top;
      if (resultsRef.current.classList.contains("hide")) {
        resultsRef.current.classList.remove("hide");
      }
    };

    const handleSelect = (index) => {
      const item = filteredItemsRef.current[index];
      inputRef.current.focus();
      onSelect(item);
      if (!resultsRef.current.classList.contains("hide")) {
        resultsRef.current.classList.add("hide");
      }
    };
    /**
     * COMMON EVENTS FOR MOUSE AND KEYBOARD EVENTS ENDS HERE
     */

    /**
     * KEYBOARD EVENTS HANDLING STARTS FROM HERE
     */
    const handleResultsKeydown = (event) => {
      const { children } = resultsRef.current;
      const count = children.length;
      const key = event.key.toUpperCase();
      switch (key) {
        case KEYS.ARROWUP: {
          children[currentChildrenIndex.current].classList.remove("active");
          if (currentChildrenIndex.current === 0) {
            /**
             * REACHED TOP ITEM
             * MOVING FOCUS TO THE INPUT COMPONENT
             */
            inputRef.current.focus();
            return;
          }
          currentChildrenIndex.current--;
          children[currentChildrenIndex.current].classList.add("active");
          return;
        }
        case KEYS.ARROWDOWN: {
          if (currentChildrenIndex.current === count - 1) {
            /**
             * REACHED LAST ITEM
             */
            return;
          }
          children[currentChildrenIndex.current].classList.remove("active");
          currentChildrenIndex.current++;
          children[currentChildrenIndex.current].classList.add("active");
          return;
        }
        case KEYS.ENTER: {
          children[currentChildrenIndex.current].classList.remove("active");
          handleSelect(currentChildrenIndex.current);
          return;
        }
        default:
          break;
      }
    };

    const handleInputKeydown = (event) => {
      const { children } = resultsRef.current;
      const key = event.key.toUpperCase();
      if (key === KEYS.ARROWDOWN && children.length) {
        children[currentChildrenIndex.current].focus();
        children[currentChildrenIndex.current].classList.add("active");
        return;
      }
    };

    /**
     * KEYBOARD EVENTS HANDLING ENDS HERE
     */

    /**
     * MOUSE EVENTS HANDLING STARTS FROM HERE
     */
    const handleMouseEnter = ({ target }) => {
      const { id } = target;
      const index = getIndexFromID(id, itemIdPrefix);

      const { children } = resultsRef.current;
      children[currentChildrenIndex.current].classList.remove("active");

      if (!children[index]) return;
      currentChildrenIndex.current = index;
      children[currentChildrenIndex.current].classList.add("active");
    };

    const handleMouseLeave = ({ target }) => {
      const { id } = target;
      const index = getIndexFromID(id, itemIdPrefix);

      const { children } = resultsRef.current;

      if (!children[index]) return;
      currentChildrenIndex.current = index;
      children[currentChildrenIndex.current].classList.remove("active");
    };

    const handleMouseClick = ({ target }) => {
      const { id } = target;
      const index = getIndexFromID(id, itemIdPrefix);

      const { children } = resultsRef.current;

      if (!children[index]) return;
      currentChildrenIndex.current = index;
      children[currentChildrenIndex.current].classList.remove("active");
      handleSelect(currentChildrenIndex.current);
    };

    /**
     * MOUSE EVENTS HANDLING ENDS HERE
     */

    return (
      <>
        <span className="autocomplete__clear__text" onClick={reset}>
          X
        </span>
        <Component {...props} forwardRef={inputRef} />
        <div className="autocomplete__results" ref={resultsRef} tabIndex="0">
          {items.map((item, index) => {
            return (
              <ListItem
                key={item[primaryKey]}
                {...item}
                htmlId={`${itemIdPrefix}${index}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleMouseClick}
                classList={[`autocomplete__result`]}
              >
                {renderItem(item)}
              </ListItem>
            );
          })}
          {props.value && !items.length ? (
            <div className="autocomplete__no__results">{noResultText}</div>
          ) : null}
        </div>
      </>
    );
  };
};
