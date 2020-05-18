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
