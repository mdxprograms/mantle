import { dispatch } from "../../src";

export const getInfectedIndex = () => Math.floor(Math.random() * 16);

export const getAllSquares = () => [...document.querySelectorAll(".game-square")];

export const disableSquareClicks = () =>
  getAllSquares().forEach((square) => (square.style.pointerEvents = "none"));

export const setSquareBg = (element, img) =>
  (element.style.background = `url(${img}) center / contain no-repeat`);

export const isInfected = (target) => target.classList.contains("infected");

export const toggleInfected = (element, infectedIndex) =>
  element.classList.toggle("infected", element.index === infectedIndex);

export const restartGame = () => {
  dispatch("game:restart", { infectedIndex: getInfectedIndex() });
};