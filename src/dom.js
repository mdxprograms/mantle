import { v4 as uuidv4 } from "uuid";
import elementTypes from "./elements.json";
import { on } from "./emitter";

let DOM = {};

elementTypes.map((type) => {
  DOM[type.element] = (props = {}, children) => {
    let el = Object.assign(document.createElement(type.element), { ...props });
    let fragment = document.createDocumentFragment();

    el.mId = !("mId" in props) ? uuidv4() : props.mId;

    if (Array.isArray(children)) {
      children.flatMap((c) => fragment.appendChild(c));
    } else if (typeof children === "string") {
      let textNode = document.createTextNode(children);
      fragment.appendChild(textNode);
    } else if (typeof children === "object") {
      fragment.appendChild(children);
    }

    el.appendChild(fragment);

    // apply native listeners
    // on
    el.on = (events = {}) => {
      for (const key in events) {
        if (Object.hasOwnProperty.call(events, key)) {
          el.addEventListener(key, events[key]);
        }
      }
      return el;
    };

    // apply custom event listeners
    // when
    el.when = (events = {}) => {
      for (const key in events) {
        if (Object.hasOwnProperty.call(events, key)) {
          on(key, (data) => events[key](el, data));
        }
      }
      return el;
    };

    return el;
  };
});

export default DOM;
