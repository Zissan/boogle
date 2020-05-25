import Book from "api/Models/book";
import {
  add,
  getValues,
  count,
  getAllValuesStartingWith,
} from "api/Models/search";
import { refineWord } from "./utils";

const bookController = function () {
  function addBooks(data) {
    const { titles, summaries, authors } = data;
    for (let index = 0; index < titles.length; index++) {
      const book = new Book(
        titles[index],
        summaries[index].summary,
        authors[index].author
      );
      const id = Book.add(book);
      summaries[index].summary.split(/\s+/).forEach((word) => {
        add(refineWord(word), id);
      });
    }
    return { rows: Book.count() };
  }

  function search(word) {
    return getValues(refineWord(word));
  }

  function searchWordStartWith(word) {
    return getAllValuesStartingWith(refineWord(word));
  }

  function searchSummary(summary, limit = 10) {
    let referenceIds = {};
    let commonIds = {};
    let emptyWordsCount = 0;
    const words = summary.split(/\s+/);

    for (let index = 0; index < words.length; index++) {
      const word = words[index];
      if (!word) {
        emptyWordsCount++;
        continue;
      }
      // const ids = search(word);
      const ids =
        index < words.length - 1 ? search(word) : searchWordStartWith(word);
      ids.forEach((id) => {
        if (!referenceIds[id]) {
          referenceIds[id] = [];
        }
        referenceIds[id].push(word);
      });
    }

    Object.keys(referenceIds).forEach((id) => {
      if (referenceIds[id].length === words.length - emptyWordsCount) {
        commonIds[id] = true;
      }
    });

    return { books: getBooks(Object.keys(commonIds).slice(0, limit)) };
  }

  function getBooks(ids) {
    if (!ids) {
      return Book.get();
    }
    let books = [];
    for (const id of ids) {
      const book = Book.getById(id);
      if (!book) continue;
      books.push(book);
    }
    return books;
  }

  function wordsCount() {
    return count();
  }

  return {
    add: addBooks,
    search,
    get: getBooks,
    wordsCount,
    searchSummary,
    searchWordStartWith,
  };
};

export default bookController;
