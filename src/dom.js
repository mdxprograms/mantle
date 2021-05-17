import elementTypes from './elements.json'
import { on } from './emitter'

let DOM = {}

const uuid = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  )

elementTypes.map((element) => {
  DOM[element] = (props = {}, children) => {
    let el = Object.assign(document.createElement(element), { ...props })
    let fragment = document.createDocumentFragment()

    if (Array.isArray(children)) {
      children.flatMap((c) => fragment.appendChild(c))
    } else if (typeof children === 'string') {
      let textNode = document.createTextNode(children)
      fragment.appendChild(textNode)
    } else if (typeof children === 'object') {
      fragment.appendChild(children)
    }

    el.setAttribute('data-mid', uuid())

    el.appendChild(fragment)

    // apply native listeners
    // on
    el.on = (events = {}) => {
      for (const key in events) {
        if (key in events) {
          el.addEventListener(key, events[key])
        }
      }
      return el
    }

    // apply custom event listeners
    // when
    el.when = (events = {}) => {
      for (const key in events) {
        if (key in events) {
          on(key, (data) => events[key](el, data))
        }
      }
      return el
    }

    return el
  }
})

export default DOM
