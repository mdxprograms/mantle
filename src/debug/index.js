import { on } from '../emitter'
import DOM from '../dom'
import { append, setStyle } from '../helpers'
import NewEntry from './NewEntry'
import widgetStyles from './styles'

const { div } = DOM

const withStyle = setStyle(widgetStyles)

const widget = withStyle(div({}, []))

const debug = () =>
  on('*', (evtName, payload, timestamp) =>
    append(NewEntry(evtName, payload, timestamp))(widget)
  )

document.body.appendChild(widget)

export default debug
