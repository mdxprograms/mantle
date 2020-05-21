import { DOM, mount, dispatch, m } from "../../src";
import { notify } from "./notifications";
import { personAdded, personRemoved } from "./events";

// Pull the needed DOM elements
const { main, div, input, button, ul, li } = DOM;

/*
 * Plugins are objects with a name and an onValue function
 * Initial Plugin names should be capitalized to avoid destructuring issues
 */
const TC = {
  name: "titleCase",
  onValue: (val) =>
    val
      .split(" ")
      .map((w) => `${w[0].toUpperCase()}${w.substr(1).toLowerCase()}`)
      .join(" "),
};

let { titleCase } = m.setPlugins([TC]);

/*
 * /examples/events.js defines event names as key/val for easier access across other files
 */
const personInput = input({ type: "text", className: "person-input" }, "");
personInput
  .on({
    keydown: ({ key, target }) => {
      if (key === "Enter") {
        dispatch(personAdded, titleCase(target.value));
      }
    },
  })
  .when({
    [personAdded]: (self, _) => (self.value = ""),
  });

const addPersonBtn = button({ className: "btn" }, "Add person");
addPersonBtn.on({
  click: () => dispatch(personAdded, titleCase(personInput.value)),
});

const personLi = (_, val) => li({}, val);
personLi.on({
  click: ({ target }) => dispatch(personRemoved, target),
});

const personList = ul({ className: "person-list" }, []);
personList.when({
  [personAdded]: (self, val) => self.appendChild(personLi(self, val)),
  [personRemoved]: (_, child) => child.remove(),
});

const container = div({ className: "container" }, [
  notify,
  personInput,
  addPersonBtn,
  personList,
]);

const App = main({ id: "app-root" }, container);

mount(document.getElementById("app"), App);
