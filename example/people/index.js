import { DOM, mount, dispatch } from "../../src";
import { notify } from "./notifications";
import { personAdded, personRemoved } from "./events";

// Pull the needed DOM elements
const { main, div, input, button, ul, li, span } = DOM;

/*
 * /examples/events.js defines event names as key/val for easier access across other files
 */
const personInput = input({ type: "text", className: "pa2 ba b--light-gray mr2" }, "");
personInput
  .on({
    keydown: ({ key, target }) => {
      if (key === "Enter") {
        dispatch(personAdded, target.value);
      }
    },
  })
  .when({
    [personAdded]: (self, _) => (self.value = ""),
    [personRemoved]: (self, _) => self.focus()
  });

const addPersonBtn = button({ className: "pa2 bg-red white bn" }, "Add person");
addPersonBtn.on({
  click: () => dispatch(personAdded, personInput.value),
});

const personLi = (_, val) =>
  li({}, [
    span({ className: "mr2 f3"}, val),
    button({ className: "pa1 bg-black white bn" }, "Delete?").on({
      click: (e) => dispatch(personRemoved, e.currentTarget.parentElement),
    }),
  ]);

const personList = ul({ className: "list pl0 mt4" }, []);
personList.when({
  [personAdded]: (self, val) => self.appendChild(personLi(self, val)),
  [personRemoved]: (_, child) => child.remove(),
});

const container = div({ className: "container tc" }, [
  notify,
  personInput,
  addPersonBtn,
  personList,
]);

const App = main({ id: "app-root" }, container);

mount(document.getElementById("app"), App);
