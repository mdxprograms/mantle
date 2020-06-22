Mantle
--

**__Currently a work in progress__**

Goals:

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

`npm start`
#### Adding and removing people from a list

```javascript
import { DOM, mount, dispatch } from "../../src";
import { notify } from "./notifications";
import { personAdded, personRemoved } from "./events";

// Pull the needed DOM elements
const { main, div, input, button, ul, li } = DOM;

/*
 * /examples/events.js defines event names as key/val for easier access across other files
 */
const personInput = input({ type: "text", className: "person-input" }, "")
  .on({
    keydown: ({ key, target }) => {
      if (key === "Enter") {
        dispatch(personAdded, target.value);
      }
    },
  })
  .when({
    [personAdded]: (self, _) => (self.value = ""),
  });

const addPersonBtn = button({ className: "btn" }, "Add person")
  .on({
    click: () => dispatch(personAdded, personInput.value),
  });

const personLi = (_, val) => li({}, val)
  .on({
    click: ({ target }) => dispatch(personRemoved, target),
  });

const personList = ul({ className: "person-list" }, [])
  .when({
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

#### Simple infected card game

`npm run start:game`
```javascript
import { DOM, dispatch, mount } from "../../src";
import {
  disableSquareClicks,
  getInfectedIndex,
  isInfected,
  restartGame,
  setSquareBg,
  toggleInfected,
} from "./helpers";

const { div, button, h5, style } = DOM;

import healthyImg from "./healthy.png";
import infectedImg from "./infected.png";

// components
const gameSquare = (index) =>
  div({ className: "game-square", index }, "")
    .on({
      click: ({ target }) => {
        if (isInfected(target)) {
          setSquareBg(target, infectedImg);
          disableSquareClicks();
          dispatch("patient:infected");

          setTimeout(() => restartGame(), 1500);
        } else {
          setSquareBg(target, healthyImg);
          dispatch("patient:saved");
        }
      },
    })
    .when({
      "game:start": (self, { infectedIndex }) =>
        toggleInfected(self, infectedIndex),
      "game:restart": (self, { infectedIndex }) => {
        self.style = {};
        toggleInfected(self, infectedIndex);
      },
    });

const savedCount = h5(
  { className: "saved-count", saved: 0 },
  "Patients Saved: 0"
).when({
  "patient:saved": (self, _) =>
    (self.textContent = `Patients Saved: ${++self.saved}`),
});

const infectedCount = h5(
  { className: "infected-count", infected: 0 },
  "Patients Infected: 0"
).when({
  "patient:infected": (self, _) => {
    self.textContent = `Patients Infected: ${++self.infected}`;
  },
});

const restartBtn = button(
  {
    className: "f6 link dim ph3 pv2 mb2 b dib white bg-black",
  },
  "Restart"
).on({
  click({ target }) {
    restartGame();
    target.textContent = "Restarting...";

    setTimeout(() => {
      target.textContent = "Restart";
    }, 1500);
  },
});

const genSquares = () =>
  Array(16)
    .fill(null)
    .map((_, index) => gameSquare(index + 1));

const gameBoard = div({ className: "game-board" }, [...genSquares()]);

// styles.js
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
document.head.appendChild(makeStyle);

const game = div({}, [restartBtn, savedCount, infectedCount, gameBoard]);

mount(document.getElementById("app"), game);
dispatch("game:start", { infectedIndex: getInfectedIndex() });
```
