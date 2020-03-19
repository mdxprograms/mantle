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

export { DOM, map, subscribe, publish };