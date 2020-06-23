/* eslint-disable no-undef */
const test = require('ava')
const { DOM } = require('../dist')

const { div } = DOM

test('create simple div', (t) => {
  const simpleDiv = div({}, 'Hi div')
  t.truthy(simpleDiv)
})
