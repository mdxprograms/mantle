import { subscribe, publish } from "pubsub.js";
import DOM from "./dom";

const map = (element, data) => {
  if (Array.isArray(data)) {
    return data.map(element);
  } else if (typeof data === "object") {
    return Object.keys(data).map(element);
  } else {
    console.error("Must supply an object or array to map data");
  }
}

function Component(data, cb) {
  let el = null;

  const render = cb;

  const update = (prevEl, newData) => {
    const nextEl = render(newData)

    console.log(nextEl)

    if (nextEl.isEqualNode(prevEl)) {
      console.warn(`no change to render`) 
    } else {
      prevEl.parentElement.replaceChild(nextEl, prevEl);
    }

    return nextEl;
  }

  let state = new Proxy(data, {
    set(target, prop, value) {
      target[prop] = value;
      console.log(target, prop, value)   
      el = update(el, target);
    }
  })

  el = render(state)


  return el;
}

export { DOM, map, Component, subscribe, publish };