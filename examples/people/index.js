import { DOM, mount, dispatch } from '../../src'
import { notify } from './notifications'
import { personAdded, personRemoved } from './events'

// Pull the needed DOM elements
const { main, div, input, button, ul, li, span } = DOM

/*
 * /examples/people/events.js defines event names as key/val for easier access across other files
 */
const PersonInput = input(
  { type: 'text', className: 'pa2 ba b--light-gray mr2' },
  ''
)
  .on({
    keydown({ key }) {
      if (key === 'Enter') {
        dispatch(personAdded, this.value)
      }
    }
  })
  .when({
    [personAdded]: self => self.value = '',
    [personRemoved]: self => self.focus()
  })

const AddPersonButton = button(
  { className: 'pa2 bg-red white bn' },
  'Add person'
).on({
  click: () => dispatch(personAdded, PersonInput.value)
})

const PersonListItem = val =>
  li({}, [
    span({ className: 'mr2 f3'}, val),
    button({ className: 'pa1 bg-black white bn' }, 'Delete?').on({
      click() {
        dispatch(personRemoved, this.parentNode)
      }
    })
  ])

const PersonList = ul({ className: 'list pl0 mt4' }, []).when({
  [personAdded]: (self, val) => self.appendChild(PersonListItem(val)),
  [personRemoved]: (self, child) => child.remove()
})

const App = main(
  { id: 'app-root' },
  div({ className: 'container tc' }, [
    notify,
    PersonInput,
    AddPersonButton,
    PersonList
  ])
)

mount(document.getElementById('app'), App)
