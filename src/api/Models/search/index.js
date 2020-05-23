import Trie from "lib/Trie";

const words = new Trie();
export const add = function (word, id) {
  words.add(word, id);
};

export const getValues = function (word) {
  return words.getValues(word);
};

export const count = function () {
  return words.count;
};
