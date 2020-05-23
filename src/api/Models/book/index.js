let books = {};
let id = 0;
class Book {
  _id = 0;
  name = "";
  summary = "";
  author = "";
  constructor(name, summary, author) {
    this._id = ++id;
    this.name = name;
    this.summary = summary;
    this.author = author;
  }
}

Book.add = function (book) {
  books[book._id] = book;
  return book._id;
};

Book.get = function () {
  return books;
};

Book.getById = function (id) {
  return books[id] ? books[id] : null;
};

Book.reset = function () {
  id = 0;
  books = {};
};

Book.count = function () {
  return Object.keys(books).length;
};

export default Book;
