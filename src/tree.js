export const createTreeItem = (el) => ({
  mId: el.mId,
  parentId: el.parentNode.mId || null,
  order: Array.from(el.parentNode.childNodes).indexOf(el),
  type: el.localName,
  el,
  attributes: [...el.attributes].map((attr) => ({
    key: attr.localName,
    value: attr.value,
  })),
});

export const createTree = (container) =>
  [...container.querySelectorAll("*")].map(createTreeItem);
