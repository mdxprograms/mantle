import { on } from '../emitter'
import DOM from '../dom'
import { append, compose, setStyle, remove, qsAll, clear } from '../helpers'
import NewEntry from './NewEntry'
import widgetStyles from './styles'

const { div, button } = DOM

const withStyle = setStyle(widgetStyles)

const widget = withStyle(
  div({}, [
    button({}, 'Clear').on({
      click() {
        qsAll('ul')(widget).forEach((x) => remove(x)(widget))
      }
    })
  ])
)

const flashElement = (element) => {
  setStyle([
    ['box-shadow', '0 0 0 2px red'],
    ['transition', 'box-shadow 200ms ease']
  ])(element)

  setTimeout(() => {
    setStyle([['box-shadow', 'none']])(element)
  }, 1500)
}

export const debug = (name = '', element) => {
  element.when({
    ['*']: (el, evtName, payload) => {
      flashElement(el)
      append(NewEntry(`${event.type} -> ${evtName} -> ${name}`, payload, 0))(
        widget
      )
    }
  })
}

const globalDebug = () =>
  on('*', (evtName, payload, timestamp) =>
    append(NewEntry(evtName, payload, timestamp))(widget)
  )

document.body.appendChild(widget)

export default globalDebug
