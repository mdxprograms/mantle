import DOM from '../../dom'
import { append, setStyle, qs, getProp } from '../../helpers'
import { withFlashStyle } from '../styles'
import newEntryStyles from './styles'

const { ul, li } = DOM

const withLiStyle = setStyle([['padding', '5px 8px']])
const withUlStyle = setStyle(newEntryStyles)

const handleClickEl = (mid) => {
  const activeDebugEl = qs(`[data-mid="${mid}"]`)(document)
  withFlashStyle(activeDebugEl)

  setTimeout(() => {
    setStyle([['box-shadow', 'none']])(activeDebugEl)
  }, 1000)
}

const NewEntryValue = (key, val) => withLiStyle(li({}, `${key}: ${val}`))

const NewEntry = (type, evtStr, el) =>
  withUlStyle(
    ul({ onclick: () => handleClickEl(getProp('data-mid')(el)) }, [
      NewEntryValue('On', type),
      NewEntryValue('Event', evtStr),
      NewEntryValue('Element Changed', el.nodeName.toLowerCase()),
      NewEntryValue('ID', getProp('data-mid')(el)),
      NewEntryValue('Timestamp', new Date().toLocaleTimeString())
    ]).on({
      mouseover() {
        setStyle([['background', '#ddd']])(this)
      },
      mouseleave() {
        setStyle(newEntryStyles)(this)
      }
    })
  )

export default NewEntry
