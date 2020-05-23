import Book from "api/Models/book";
import { add, getValues, count } from "api/Models/search";

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
        add(word, id);
      });
    }
    return { rows: Book.count() };
  }

  function search(word) {
    return getValues(word);
  }

  function getBooks(ids) {
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
  };
};

export default bookController;
