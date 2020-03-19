import { v4 as uuidv4 } from 'uuid';
import elementTypes from "./elements.json";

let DOM = {};

elementTypes.map(type => {
  DOM[type.element] = (props = {}, children) => {
    let el = Object.assign(document.createElement(type.element), {...props});
    el.mId = uuidv4();

    if (Array.isArray(children)) {
      children.flatMap(c => el.appendChild(c));
    } else if (typeof children === "string") {
      let textNode = document.createTextNode(children);
      el.appendChild(textNode);
    } else if (typeof children === "object") {
      el.appendChild(children);
    }

    return el;
  }
});

export default DOM;