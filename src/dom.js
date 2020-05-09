import { v4 as uuidv4 } from "uuid";
import elementTypes from "./elements.json";
import Observer from "./observer";

let DOM = {};

elementTypes.map((type) => {
  DOM[type.element] = (props = {}, children) => {
    let el = Object.assign(document.createElement(type.element), { ...props });
    let fragment = document.createDocumentFragment();

    const validProps = Object.keys(props)
      .filter((key) => key.includes("prop:"))
      .map((k, i) => {
        el.addEventListener(k, (e) => el.setAttribute(k, e.detail));
      });

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
    Observer(el);

    return el;
  };
});

export default DOM;
