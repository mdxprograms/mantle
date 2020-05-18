import { DOM, mount, dispatch, m } from "../../src";
import { notify } from "./notifications";
import { personAdded, personRemoved } from "./events";

// Pull the needed DOM elements
const { main, div, input, button, ul, li } = DOM;

// Plugins either installed or local can be applied like the following
const TC = {
  name: "titleCase",
  onValue: (val) =>
    val
      .split(" ")
      .map((w) => `${w[0].toUpperCase()}${w.substr(1).toLowerCase()}`)
      .join(" "),
};

const ToURL = {
  name: "toUrl",
  onValue: (val) => val.split(" ").join("-"),
};

/*
 * Plugins are objects with a name and an onValue function
 * Initial Plugin names should be capitalized to avoid destructuring issues
 */
let { titleCase } = m.setPlugins([TC, ToURL]);

/*
 * Functions defined with : are automatically mapped to dispatch and
 * receive the dispatched value.
 * /examples/events.js defines event names for easier access across other files
 */
const personInput = input({
  [personAdded]: () => (personInput.value = ""),
  onkeydown: ({ key, target }) => {
    if (key === "Enter") {
      dispatch(personAdded, titleCase(target.value));
    }
  },
});

// Use dispatch to send an event
const addPersonBtn = button(
  {
    onclick: () => dispatch(personAdded, titleCase(personInput.value)),
  },
  "Add person"
);

const personList = ul({
  [personAdded]: (val) =>
    personList.appendChild(
      li({ onclick: ({ target }) => dispatch(personRemoved, target) }, val)
    ),
  [personRemoved]: (child) => child.remove(),
});

const container = div({ className: "container" }, [
  notify,
  personInput,
  addPersonBtn,
  personList,
]);

const App = main({ id: "app-root" }, container);

mount(document.getElementById("app"), App);
