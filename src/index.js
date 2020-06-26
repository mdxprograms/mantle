import DOM from './dom'
import { dispatch } from './emitter'
import { setProp, setStyle, getProp, compose } from './helpers'

const mount = (el, container) => {
  el.appendChild(container)
}

export { DOM, mount, dispatch, setProp, setStyle, getProp, compose }
