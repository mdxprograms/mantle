import DOM from "./dom";

const createTreeItem = el => ({
  mId: el.mId,
  parentId: el.parentNode.mId || null,
  order: Array.from(el.parentNode.childNodes).indexOf(el),
  type: el.localName,
  attributes: [...el.attributes].map(attr => ({
    key: attr.localName,
    value: attr.value
  }))
});

const createTree = container =>
  [...container.querySelectorAll("*")].map(createTreeItem);

export class State {
  constructor(initialState = {}) {
    this.current = initialState;
  }

  update(statePath, value) {
    console.log(statePath, value)
    this.current[statePath] = value;
  }

  get(key) {
    return this.current[key];
  }
}

const mount = (el, container) => {
  const tree = createTree(container);
  el.appendChild(container);
};

export { DOM, mount };
