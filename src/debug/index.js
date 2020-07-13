import { on } from '../emitter'
import DOM from '../dom'
import { prepend, compose, setStyle, remove, qsAll, qs, clear } from '../helpers'
import NewEntry from './NewEntry'
import widgetStyles from './styles'

const { div, button, h4 } = DOM

const withStyle = setStyle(widgetStyles)

const onClearBtnEnter = setStyle([
  ['background', '#f45'],
  ['color', '#f7f7f7'],
  ['box-shadow', '0 0 4px #666']
])

const onClearBtnLeave = setStyle([
  ['background', '#f78'],
  ['color', '#fff']
])

const DebugList = setStyle([
  ['align-items', 'flex-start'],
  ['display', 'flex'],
  ['flex-direction', 'row'],
  ['flex-wrap', 'no-wrap']
])(div({ id: 'debug-list' }, []))

const ClearBtn = () => {
  const withBtnStyle = setStyle([
    ['align-self', 'flex-start'],
    ['background', '#f78'],
    ['border', 'none'],
    ['box-shadow', '0 0 2px #666'],
    ['color', '#fff'],
    ['cursor', 'pointer'],
    ['margin', '0 0 0 10px'],
    ['padding', '2px 5px 5px'],
    ['transition', 'all 200ms ease-in-out']
  ])

  return withBtnStyle(
    button({}, 'clear').on({
      click() {
        clear(DebugList)
      },
      mouseenter() {
        onClearBtnEnter(this)
      },
      mouseleave() {
        onClearBtnLeave(this)
      }
    })
  )
}

const widget = withStyle(
  div({}, [
    setStyle([['margin', '0 10px 0 0']])(h4({}, 'debug')),
    ClearBtn(),
    DebugList
  ])
)

const flashElement = (element) => {
  setStyle([
    ['box-shadow', '0 0 5px tomato'],
    ['transition', 'box-shadow 200ms ease']
  ])(element)

  setTimeout(() => {
    setStyle([['box-shadow', 'none']])(element)
  }, 1000)
}

export const debug = (name = '', element) => {
  element.when({
    ['*']: (el, evtName, payload) => {
      flashElement(el)
      prepend(
        NewEntry(`${event.type} -> ${evtName} -> ${name}`, payload || null, 0)
      )(DebugList)
    }
  })
}

const globalDebug = () =>
  on('*', (evtName, payload, timestamp) =>
    prepend(NewEntry(evtName, payload, timestamp))(widget)
  )

document.body.appendChild(widget)

export default globalDebug
