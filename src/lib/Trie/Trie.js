const Node = function () {
  this.bucket = {};
  this.map = {};
  this.addValue = (value) => {
    this.bucket[value] = true;
  };
  this.isEnd = () => {
    return Object.keys(this.bucket).length > 0;
  };
};

const Trie = function () {
  this.count = 0;
  this.root = new Node();
  this.cache = {}; // To be done
  this.cacheDuration = 1000; // To be done
};

Trie.prototype.add = function (word, value) {
  let isNew = false;
  let currentNode = null;
  /*
  if (this.cache[word]) {
    currentNode = this.cache[word];
    currentNode.addValue(value);
    return;
  }
  */
  for (let index = 0; index < word.length; index++) {
    const element = word[index];
    if (currentNode === null) {
      currentNode = this.root;
    }
    if (!currentNode.map[element]) {
      isNew = true;
      currentNode.map[element] = new Node();
    }
    currentNode = currentNode.map[element];
    if (index === word.length - 1) {
      currentNode.addValue(value);
    }
  }
  if (isNew) {
    this.count++;
  }
};

Trie.prototype.getValues = function (word) {
  let values = [];
  let lastNode = this.getExactMatchLastNode(word);
  if (lastNode) {
    values = Object.keys(lastNode.bucket);
  }
  return values;
};

Trie.prototype.getExactMatchLastNode = function (word) {
  let lastNode = null;
  for (let index = 0; index < word.length; index++) {
    const letter = word[index];
    if (lastNode === null) {
      lastNode = this.root;
    }
    if (!lastNode.map[letter]) {
      lastNode = null;
      break;
    }
    lastNode = lastNode.map[letter];
  }
  return lastNode;
};

Trie.prototype.getAllValuesStartingWith = function (word) {
  const lastNode = this.getExactMatchLastNode(word);
  if (!lastNode) return [];
  if (lastNode == this.root) return [];

  let values = {};

  function search(node) {
    values = { ...values, ...node.bucket };
    const letters = Object.keys(node.map);
    if (letters.length) {
      for (const letter of letters) {
        search(node.map[letter]);
      }
    }
  }
  search(lastNode);

  return Object.keys(values);
};

Trie.prototype.clear = function () {
  this.root = new Node();
  this.count = 0;
};

export default Trie;
