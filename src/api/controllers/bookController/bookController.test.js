import { data1, data2 } from "tools/test.data.json";
import bookController from "api/controllers/bookController";
import Book from "api/Models/book";
describe("SUT: bookController", () => {
  describe("When the action method, add, is invoked with test data1", function () {
    let controller = null;
    let response = null;
    beforeAll(function () {
      //ARRANGE
      Book.reset();
      controller = bookController();

      //ACT
      response = controller.add(data1);
    });

    it("Should return Two rows", () => {
      //ASSERT
      expect(response.rows).toBe(2);
    });

    it("Should have Seven unique words.", function () {
      //ASSERT
      expect(controller.wordsCount()).toBe(11);
    });

    test("The word, Practicing, should have only one id.", function () {
      //ASSERT
      const ids = controller.search("Practicing");

      expect(ids.length).toBe(1);
    });

    test("The word, Practicing, should have id, 1.", function () {
      //ASSERT
      const ids = controller.search("Practicing");

      expect(ids[0]).toBe("1");
    });

    test("The word, 10X, should be mapped with the book name, The Richest Man in Babylon", function () {
      //ASSERT
      const ids = controller.search("10X");
      const books = controller.get(ids);
      expect(books[0].name).toBe("The Richest Man in Babylon");
    });

    test("The word, The, should be mapped with Two ids.", function () {
      //ASSERT
      const ids = controller.search("The");
      expect(ids.length).toBe(2);
    });
  });

  describe("When the action method, add, is invoked with test data2", function () {
    let controller = null;
    let response = null;
    beforeAll(function () {
      //ARRANGE
      Book.reset();
      controller = bookController();

      //ACT
      response = controller.add(data2);
    });

    it("Should return Three rows", () => {
      //ASSERT
      expect(response.rows).toBe(3);
    });

    it("Should have Twenty Four unique words.", function () {
      //ASSERT
      expect(controller.wordsCount()).toBe(24);
    });

    test("The word, The, should be mapped with Three ids.", function () {
      //ASSERT
      const ids = controller.search("The");
      expect(ids.length).toBe(3);
    });

    test("The method, searchSummary, should return one Book with name, Letters from a Self-Made Merchant to His Son, on invoking with the words, The only thing.", function () {
      //ASSERT
      const { books } = controller.searchSummary("The only thing");
      expect(books[0].name).toBe(
        "Letters from a Self-Made Merchant to His Son"
      );
    });

    test("The method, searchSummary, should return Three Books, on invoking with the word, The", function () {
      //ASSERT
      const { books } = controller.searchSummary("The");
      expect(books.length).toBe(3);
    });

    test("The method, searchSummary, should return Three Books, on invoking with the word, The Book in Three Sentences:", function () {
      //ASSERT
      const { books } = controller.searchSummary(
        "The Book in Three Sentences:"
      );
      expect(books.length).toBe(3);
    });
  });
});
