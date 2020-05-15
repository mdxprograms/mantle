import DOM from "./dom";
import { dispatch, on } from "./emitter";

class Mantle {
  constructor () {
    this.plugins = {};
  }

  addPlugin (plugin) {
    if (Object.keys(this.plugins).find((p) => p.name === plugin.name)) {
      throw new Error(`Plugin exists: ${plugin.name}`);
    }

    this.plugins[plugin.name] = plugin.onValue;

    return this.plugins;
  }

  setPlugins (plugins) {
    plugins.map((p) => this.addPlugin(p));

    return this.plugins;
  }
}

const mount = (el, container) => {
  el.appendChild(container);
};

export { DOM, mount, dispatch, on, Mantle };
