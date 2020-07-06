import { DOM, setText, getText, qs, compose } from '../../src'

const { div } = DOM

export const notify = div(
  {
    className: 'notifications f2 tc mb5'
  },
  'Notifications'
).when({
  ['person:added']: (self, val) => {
    setText(`${val} was added.`)(self)
  },
  ['person:removed']: (self, element) => {
    setText(
      `Removed ${compose(getText, qs('span'))(element)}`
    )(self)
  }
})
