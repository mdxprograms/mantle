import { DOM, dispatch, mount } from '../../src'
import {
  disableSquareClicks,
  getInfectedIndex,
  isInfected,
  restartGame,
  setSquareBg,
  toggleInfected
} from './helpers'

const { div, button, h5, style } = DOM

import healthyImg from './healthy.png'
import infectedImg from './infected.png'

// components
const gameSquare = index =>
  div({ className: 'game-square', index }, '')
    .on({
      click: ({ target }) => {
        if (isInfected(target)) {
          setSquareBg(target, infectedImg)
          disableSquareClicks()
          dispatch('patient:infected')

          setTimeout(() => restartGame(), 1500)
        } else {
          setSquareBg(target, healthyImg)
          dispatch('patient:saved')
        }
      }
    })
    .when({
      'game:start': (self, { infectedIndex }) =>
        toggleInfected(self, infectedIndex),
      'game:restart': (self, { infectedIndex }) => {
        self.style = {}
        toggleInfected(self, infectedIndex)
      }
    })

const savedCount = h5(
  { className: 'saved-count', saved: 0 },
  'Patients Saved: 0'
).when({
  'patient:saved': self =>
    (self.textContent = `Patients Saved: ${++self.saved}`)
})

const infectedCount = h5(
  { className: 'infected-count', infected: 0 },
  'Patients Infected: 0'
).when({
  'patient:infected': self => {
    self.textContent = `Patients Infected: ${++self.infected}`
  }
})

const restartBtn = button(
  {
    className: 'f6 link dim ph3 pv2 mb2 b dib white bg-black'
  },
  'Restart'
).on({
  click({ target }) {
    restartGame()
    target.textContent = 'Restarting...'

    setTimeout(() => {
      target.textContent = 'Restart'
    }, 1500)
  }
})

const genSquares = () =>
  Array(16)
    .fill(null)
    .map((_, index) => gameSquare(index + 1))

const gameBoard = div({ className: 'game-board' }, [...genSquares()])

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
)

// initialize game app
document.head.appendChild(makeStyle)

const game = div({}, [restartBtn, savedCount, infectedCount, gameBoard])

mount(document.getElementById('app'), game)
dispatch('game:start', { infectedIndex: getInfectedIndex() })
