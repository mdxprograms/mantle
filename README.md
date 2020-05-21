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

#### Basic contact from
```javascript
import { DOM, dispatch } from "mantle";

const { form, input, textarea, button } = DOM;

const handleFormSubmit = ({ target }) => {
  // do form things
  const { name, message } = target.elements;
  dispatch("form:submitted", { name: name.value, message: message.value })
};

const contactForm = form(
  { className: "contact-form", onsubmit: handleFormSubmit },
  [
    input(
      {
        type: "text",
        className: "name",
        name: "name",
        placeholder: "Your Name...",
      },
      ""
    ),
    textarea(
      { className: "message", name: "message", placeholder: "Your Message..." }, ""
    ),
    button({ type: "submit", className: "btn" }, "Submit"),
  ]
);

export default contactForm;
```

`npm start`
#### Adding and removing people from a list

```javascript
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

```

#### Simple game

`npm run start:game`
```javascript
import { DOM, dispatch, mount } from "../../src";

const { div, button, h5, style } = DOM;

import healthyImg from "./healthy.png";
import infectedImg from "./infected.png";

// functions and actions
const getInfectedIndex = () => Math.floor(Math.random() * 16);

const genSquares = () =>
  Array(16)
    .fill(null)
    .map((_, index) => new GameSquare(index + 1));

const getAllSquares = () => [...document.querySelectorAll(".game-square")];

const disableSquareClicks = () =>
  getAllSquares().forEach((square) => (square.style.pointerEvents = "none"));

const isInfected = (target) => target.classList.contains("infected");

const restartGame = () => {
  dispatch("game:restart", { infectedIndex: getInfectedIndex() });
};

// components
function GameSquare(index) {
  this.index = index;

  this.checkInfection = (infectedIndex) =>
    this.element.classList.toggle("infected", this.index === infectedIndex);

  this.setSquareBg = (status) =>
    (this.element.style.background = `url(${
      status === "healthy" ? healthyImg : infectedImg
    }) center / contain no-repeat`);

  this.element = div({
    className: "game-square",
    "game:start": ({ infectedIndex }) => this.checkInfection(infectedIndex),
    "game:restart": ({ infectedIndex }) => {
      this.element.style = {};
      this.checkInfection(infectedIndex);
    },
    onclick: ({ target }) => {
      if (isInfected(target)) {
        this.setSquareBg("infected");
        disableSquareClicks();
        dispatch("patient:infected");

        setTimeout(() => restartGame(), 1500);
      } else {
        this.setSquareBg("healthy");
        dispatch("patient:saved");
      }
    },
  });

  return this.element;
}

function SavedCount() {
  this.saved = 0;

  this.element = h5(
    {
      className: "saved-count",
      "patient:saved": () => {
        this.element.textContent = `Patients Saved: ${++this.saved}`;
      },
    },
    "Patients Saved: 0"
  );

  return this.element;
}

function InfectedCount() {
  this.infected = 0;

  this.element = h5(
    {
      className: "infected-count",
      "patient:infected": () => {
        this.element.textContent = `Patients Infected: ${++this.infected}`;
      },
    },
    "Patients Infected: 0"
  );

  return this.element;
}

const restartBtn = button(
  {
    className: "f6 link dim ph3 pv2 mb2 b dib white bg-black",
    onclick() {
      restartGame();
      restartBtn.textContent = "Restarting...";

      setTimeout(() => {
        restartBtn.textContent = "Restart";
      }, 1500);
    },
  },
  "Restart"
);

const gameBoard = div({ className: "game-board" }, [...genSquares()]);

const makeStyle = style(
  {},
  `
  .game-board {
    display: grid;
    grid-gap: 12px;
    grid-template-columns: repeat(auto-fill, calc(100vw / 5));
    height: 90vh;
    margin: 0 auto;
    width: 90vw;
  }

  .game-square {
    background: lightgray;
    cursor: pointer;
    height: 100%;
    width: 100%;
  }
`
);

// initialize game app
document.addEventListener("DOMContentLoaded", () => {
  document.head.appendChild(makeStyle);

  const savedCount = new SavedCount();
  const infectedCount = new InfectedCount();
  const game = div({}, [restartBtn, savedCount, infectedCount, gameBoard]);
  mount(document.getElementById("app"), game);
  dispatch("game:start", { infectedIndex: getInfectedIndex() });
});

```
