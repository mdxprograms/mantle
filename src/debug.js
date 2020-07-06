
import { on } from './emitter'
import DOM from './dom'
import { append, setStyle } from './helpers'

const { div, ul, li } = DOM

const widget = setStyle([
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
])(div({}, []))

const NewEntryValue = (key, val) =>
  setStyle([
    ['padding', '5px 8px']
  ])(li({}, `${key}: ${val}`))

const NewEntry = (evtName, payload, timestamp) =>
  setStyle([
    ['background', '#fff'],
    ['border-radius', '4px'],
    ['padding', '0 5px 5px 0'],
    ['list-style', 'none'],
    ['transition', 'all 200ms ease-in']
  ])(
    ul({}, [
      NewEntryValue('Event', evtName),
      NewEntryValue('Payload', payload),
      NewEntryValue('Timestamp', new Date().toLocaleTimeString(timestamp))
    ])
  )

const debug = () =>
  on('*', (evtName, payload, timestamp) =>
    append(NewEntry(evtName, payload, timestamp))(widget)
  )

document.body.appendChild(widget)

export default debug
