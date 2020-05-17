Mantle
--

Principals:

- Easy to write
- Javascript only
- Minimal markup
- Event system over state machine

## Local Setup
- `nvm install && nvm use`
- `npm i`
- `npm start`

## UI tests
- `npm run test` (will start cypress)

## Build
- `npm run build`

## Examples

#### Adding and removing people from a list

```javascript
import { DOM, mount, dispatch, Mantle } from "../src";
import { notify } from "./notifications";

// Pull the needed DOM elements
const { main, div, input, button, ul, li } = DOM;

// Intialize Mantle for core features, (plugins, built in functions)
const m = new Mantle();

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
let { titleCase, toUrl } = m.setPlugins([TC, ToURL]);

/*
 * Functions defined with : are automatically mapped to dispatch and
 * receive the dispatched value
 */
const personInput = input({
  "person:added"() {
    personInput.value = "";
  },
});

// Use dispatch to send an event
const addPersonBtn = button(
  {
    onclick: () => {
      dispatch("person:added", titleCase(personInput.value));
    },
  },
  "Add person"
);

const personList = ul({
  "person:added"(val) {
    personList.appendChild(
      li({ onclick: (e) => dispatch("person:removed", e.target) }, val)
    );
  },
  "person:removed"(li) {
    li.remove();
  },
});

const container = div({ className: "container" }, [
  notify,
  personInput,
  addPersonBtn,
  personList,
]);

const App = main({ id: "app-root" }, container);

mount(document.getElementById("app"), App);
```
