import DOM from "./dom";
import { dispatch } from "./emitter";

const mount = (el, container) => {
  el.appendChild(container);
};

export { DOM, mount, dispatch };
