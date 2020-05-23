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
};

Trie.prototype.add = function (word, value) {
  let isNew = false;
  let currentNode = null;
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
  let currentNode = null;
  let values = [];
  for (let index = 0; index < word.length; index++) {
    const element = word[index];
    if (currentNode === null) {
      currentNode = this.root;
    }
    if (!currentNode.map[element]) {
      break;
    }
    currentNode = currentNode.map[element];
    if (index === word.length - 1) {
      values = Object.keys(currentNode.bucket);
    }
  }
  return values;
};

Trie.prototype.clear = function () {
  this.root = new Node();
  this.count = 0;
};

export default Trie;
