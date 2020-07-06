import { DOM, dispatch } from '../../src'

const { input, div, button } = DOM

const PersonInput = input(
  { type: 'text', className: 'pa2 ba b--light-gray mr2' },
  ''
)
  .on({
    keydown({ key }) {
      if (key === 'Enter') {
        dispatch('person:added', this.value)
      }
    }
  })
  .when({
    ['person:added']: self => self.value = '',
    ['person:removed']: self => self.focus()
  })

const AddPersonButton = button(
  { className: 'pa2 bg-red white bn' },
  'Add person'
).on({
  click: () => dispatch('person:added', PersonInput.value)
})

const NewPersonForm = div({ className: 'new-person-form' }, [
  PersonInput,
  AddPersonButton
])

export default NewPersonForm
