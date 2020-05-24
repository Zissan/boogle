export function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}

export function getIndexFromID(id, idPrefix) {
  if (id.indexOf(idPrefix) === -1) return -1;
  return parseInt(id.replace(idPrefix, ""));
}
