import { on } from './emitter'
import DOM from './dom'
import { append, setStyle } from './helpers'

const { div, p } = DOM

const widget = div({}, [])
setStyle([
  ['background', '#ddd'],
  ['border-top-left-radius', '4px'],
  ['bottom', 0],
  ['box-shadow', '0 1px 4px #444'],
  ['color', '#222'],
  ['font-size', '20px'],
  ['min-height', '30vh'],
  ['max-width', '300px'],
  ['padding', '0 10px'],
  ['position', 'absolute'],
  ['right', 0]
])(widget)

const debug = () =>
  on('*', (evtName, payload, timestamp) =>
    append(p({}, `${evtName} ${payload} ${timestamp}`))(widget)
  )

document.body.appendChild(widget)

export default debug
