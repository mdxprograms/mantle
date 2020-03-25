import DOM from "./dom";

const createTreeItem = el => ({
  mId: el.mId,
  parentId: el.parentNode.mId,
  order: Array.from(el.parentNode.childNodes).indexOf(el),
  type: el.localName,
  attributes: [...el.attributes].map(attr => ({
    key: attr.localName,
    value: attr.value
  }))
});

const createTree = container =>
  [...container.querySelectorAll("*")].map(createTreeItem);

const mount = (el, container) => {
  el.appendChild(container);
  const tree = createTree(el);
  console.log(tree);
};

export { DOM, mount };
