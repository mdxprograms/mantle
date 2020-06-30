/* eslint-disable no-undef */
import test from 'ava'
import {
  DOM,
  setProp,
  setStyle,
  getProp,
  compose,
  append,
  remove,
  clear,
  setText,
  getText,
  qs,
  qsAll
} from '../src'

const { button, ul, li } = DOM

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
  setStyle([['background', 'orange']])(t.context.btn)

  t.is(t.context.btn.style.background, 'orange')
})

test('Should compose button data-title and add border', t => {
  compose(
    setProp('data-title', 'Test Button'),
    setStyle([['border', '1px solid red']])
  )(t.context.btn)

  t.is(t.context.btn.dataset.title, 'Test Button')
  t.is(t.context.btn.style.border, '1px solid red')
})

test('Should append child to parent element', t => {
  const list = ul({}, [])
  const listItem = li({}, 'Child')
  append(listItem)(list)
  t.is(list.children[0].textContent, 'Child')
})

test('Should remove child element', t => {
  const listItem = li({}, 'Child')
  const list = ul({}, [listItem])
  t.is(list.firstElementChild.textContent, 'Child')
  remove(list.firstElementChild)(list)
  t.is(list.children.length, 0)
})

test('Should remove all children', t => {
  const list = ul({}, [
    li({}, 'item 1'),
    li({}, 'item 1'),
    li({}, 'item 1'),
    li({}, 'item 1'),
    li({}, 'item 1'),
    li({}, 'item 1'),
    li({}, 'item 1')
  ])

  t.is(list.children.length, 7)
  clear(list)
  t.is(list.children.length, 0)
})

test('Should set text of element', t => {
  const btn = button({}, 'Hello')
  t.is(btn.textContent, 'Hello')
  setText('Changed Button')(btn)
  t.is(btn.textContent, 'Changed Button')
})

test('Should get text of element', t => {
  const btn = button({}, 'Hello')
  t.is(getText(btn), 'Hello')
})

test('Should return child element when queried', t => {
  const list = ul({}, [
    li({ className: 'first-child' }, 'First Child'),
    li({ className: 'second-child' }, 'Second Child')
  ])
  const firstChild = qs('.first-child')(list)
  t.is(getText(firstChild), 'First Child')
})

test('Should return nodeList of elements when queried', t => {
  const list = ul({}, [
    li({ className: 'first-child' }, 'First Child'),
    li({ className: 'second-child' }, 'Second Child')
  ])
  t.is(getText(qsAll('li')(list)[0]), 'First Child')
  t.is(getText(qsAll('li')(list)[1]), 'Second Child')
})
