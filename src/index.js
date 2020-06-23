import DOM from './dom'
import { dispatch, on } from './emitter'

const mount = (el, container) => {
  el.appendChild(container)
}

export { DOM, mount, dispatch, on }
