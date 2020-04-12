import { lensPath, lensProp, set, view } from "ramda";

const statePath = key => lensPath(key.split("."));

export default class State {
  constructor(initialState = {}) {
    this.current = initialState;
  }

  update(key, value) {
    const keyPath = statePath(key);
    this.current = set(keyPath, value, this.current);
  }

  get(key = "") {
    if (key.length > 0) {
      return view(statePath(key), this.current);
    }

    return this.current;
  }
}
