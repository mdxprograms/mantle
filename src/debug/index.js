import { on } from '../emitter'
import DOM from '../dom'
import { prepend, setStyle, clear } from '../helpers'
import NewEntry from './NewEntry'
import {
  withBtnStyle,
  withFlashStyle,
  withWidgetStyle,
  withListStyle,
  onClearBtnEnter,
  onClearBtnLeave
} from './styles'

const { div, button } = DOM

const DebugList = withListStyle(div({ id: 'debug-list' }, []))

const ClearBtn = withBtnStyle(
  button({}, 'clear').on({
    click() {
      clear(DebugList)
      hideClearBtn()
    },
    mouseenter() {
      onClearBtnEnter(this)
    },
    mouseleave() {
      onClearBtnLeave(this)
    }
  })
)

const hideClearBtn = () => setStyle([['display', 'none']])(ClearBtn)

const showClearBtn = () => setStyle([['display', 'block']])(ClearBtn)

const Widget = () => withWidgetStyle(div({}, [ClearBtn, DebugList]))

const flashElement = (element) => {
  withFlashStyle(element)

  setTimeout(() => {
    setStyle([['box-shadow', 'none']])(element)
  }, 1000)
}

export const debug = (name = '', element) => {
  element.when({
    ['*']: (el, evtName) => {
      flashElement(el)
      prepend(NewEntry(event.type, evtName, el))(DebugList)
      showClearBtn()
    }
  })
}

const globalDebug = () =>
  on('*', (evtName) =>
    prepend(NewEntry('global', evtName, event.target))(Widget())
  )

document.body.appendChild(Widget())

export default globalDebug
