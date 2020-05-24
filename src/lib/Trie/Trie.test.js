import Trie from "./Trie";
describe("SUT: TRIE", () => {
  describe("When an instance of Trie is created", () => {
    let db = null;
    beforeAll(() => {
      db = new Trie();
    });

    afterAll(() => {
      db = null;
    });
    test("Should have an root instance with no initial letters.", () => {
      // ACT
      const db = new Trie();
      const { root } = db;
      // ASSERT
      expect(Object.keys(root.map).length).toBe(0);
    });

    test("Should have zero count.", () => {
      // ACT
      const db = new Trie();
      const { count } = db;
      // ASSERT
      expect(count).toBe(0);
    });

    describe("When three words, The, There, Their, are the added to the db instance", function () {
      beforeAll(() => {
        // ARRANGE
        db.add("The", 1);
        db.add("There", 2);
        db.add("Their", 3);
      });

      it("Should return Three values on invoking the method, getAllValuesStartingWith, with the word, The.", () => {
        // ACT
        const values = db.getAllValuesStartingWith("The");

        // ASSERT
        expect(values.length).toBe(3);
      });

      it("Should return Zero values on invoking the method, getAllValuesStartingWith, with the word, Test.", () => {
        // ACT
        const values = db.getAllValuesStartingWith("Test");

        // ASSERT
        expect(values.length).toBe(0);
      });

      it("Should return One value on invoking the method, getValues, with the word, The.", () => {
        // ACT
        const values = db.getValues("The");

        // ASSERT
        expect(values.length).toBe(1);
      });
    });
  });
});
