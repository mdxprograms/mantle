import DOM from '../../dom'
import { append, setStyle } from '../../helpers'
import newEntryStyles from './styles'

const { ul, li } = DOM

const withLiStyle = setStyle([['padding', '5px 8px']])
const withUlStyle = setStyle(newEntryStyles)

const NewEntryValue = (key, val) => withLiStyle(li({}, `${key}: ${val}`))

const NewEntry = (evtName, payload, timestamp) =>
  withUlStyle(
    ul({}, [
      NewEntryValue('Event', evtName),
      NewEntryValue('Payload', payload),
      NewEntryValue('Timestamp', new Date().toLocaleTimeString(timestamp))
    ])
  )

export default NewEntry
