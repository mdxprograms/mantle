import onChange from "on-change";
import DOM from "./dom";
import { createTreeItem, createTree } from "./tree";

let currentState = {};
let tree = [];

const setState = (state) =>
  onChange(state, function (path, value, previousValue) {
    console.log("changed");
    console.log(path, previousValue, value);
    let found = tree.find(
      ({ el }) => el.textContent === previousValue || el.value === previousValue
    );
    console.log(found);
  });

const mount = (el, container, state) => {
  currentState = setState(state);
  const base = container(currentState);
  tree = createTree(base);

  el.appendChild(base);
};

export { DOM, mount, currentState };
