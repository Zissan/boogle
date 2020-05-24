import Book from "api/Models/book";
import { add, getValues, count } from "api/Models/search";
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
    word = JSON.parse(JSON.stringify(word));
    word = word.replace(/[^a-zA-Z0-9]/g, "");
    return getValues(refineWord(word));
  }

  function searchSummary(summary) {
    let referenceIds = {};
    let commonIds = {};
    const words = summary.split(/\s+/);

    words.forEach((word) => {
      const ids = search(word);
      ids.forEach((id) => {
        if (!referenceIds[id]) {
          referenceIds[id] = [];
        }
        referenceIds[id].push(word);
      });
    });

    Object.keys(referenceIds).forEach((id) => {
      if (referenceIds[id].length === words.length) {
        commonIds[id] = true;
      }
    });

    return { books: getBooks(Object.keys(commonIds)) };
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
  };
};

export default bookController;
