import data from "tools/test.data.json";
import bookController from "api/controllers/bookController";
import Book from "api/Models/book";
describe("SUT: bookController", () => {
  describe("When the action method, add, is invoked with test data", function () {
    let controller = null;
    let response = null;
    beforeAll(function () {
      //ARRANGE
      Book.reset();
      controller = bookController();

      //ACT
      response = controller.add(data);
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

      expect(ids[0]).toBe(1);
    });

    test("The word, 10X, should be mapped with the book name, The Richest Man in Babylon", function () {
      //ASSERT
      const ids = controller.search("10X");
      const books = controller.get(ids);
      expect(books[0].name).toBe("The Richest Man in Babylon");
    });
  });
});
