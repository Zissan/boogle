export const refineWord = (word) => {
  word = JSON.parse(JSON.stringify(word));
  return word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
};
