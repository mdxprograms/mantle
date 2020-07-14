import { DOM, mount, dispatch, append, remove, debug } from '../../src'
import { notify } from './notifications'
import NewPersonForm from './NewPersonForm'

// Pull the needed DOM elements
const { main, div, button, ul, li, span } = DOM

const PersonListItem = (val) =>
  li({}, [
    span({ className: 'mr2 f3' }, val),
    button({ className: 'pa1 bg-black white bn' }, 'Delete?').on({
      click() {
        dispatch('person:removed', this.parentNode)
      }
    })
  ])

const PersonList = ul({ className: 'list pl0 mt4' }, []).when({
  ['person:added']: (self, val) => append(PersonListItem(val))(self),
  ['person:removed']: (self, child) => remove(child)(self)
})
debug('PersonList', PersonList)

const App = main(
  { id: 'app-root' },
  div({ className: 'container tc' }, [notify, NewPersonForm, PersonList])
)

mount(document.getElementById('app'), App)
