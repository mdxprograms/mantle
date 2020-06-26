/* eslint-disable no-undef */
import test from 'ava'
import { DOM, setProp, setStyle, getProp, compose } from '../src'

const { button } = DOM

test.beforeEach(t => {
  t.context = {
    btn: button({}, 'Test Button')
  }
})

test('Should disable button with setProp', t => {
  setProp('disabled', true)(t.context.btn)
  t.is(getProp('disabled')(t.context.btn), 'true')
})

test('Should set button background orange', t => {
  setStyle([
    ['background', 'orange']
  ])(t.context.btn)

  t.is(t.context.btn.style.background, 'orange')
})

test('Should compose button data-title and add border', t => {
  compose(
    setProp('data-title', 'Test Button'),
    setStyle([
      ['border', '1px solid red']
    ])
  )(t.context.btn)

  t.is(t.context.btn.dataset.title, 'Test Button')
  t.is(t.context.btn.style.border, '1px solid red')
})
