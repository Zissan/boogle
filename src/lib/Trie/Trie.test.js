import Trie from "./Trie";
describe("SUT: TRIE", () => {
  describe("When an instance of Trie is created", () => {
    let db = null;
    beforeAll(() => {
      db = new Trie();
    });

    afterEach(() => {
      db.clear();
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
      expect(Object.keys(count).length).toBe(0);
    });
  });
});
