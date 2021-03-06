import DOM from './dom'
import { dispatch } from './emitter'
import {
  setProp,
  setStyle,
  getProp,
  compose,
  append,
  remove,
  clear,
  setText,
  getText,
  qs,
  qsAll
} from './helpers'

const mount = (el, container) => {
  el.appendChild(container)
}

export {
  DOM,
  mount,
  dispatch,
  setProp,
  setStyle,
  getProp,
  compose,
  append,
  remove,
  clear,
  setText,
  getText,
  qs,
  qsAll
}
