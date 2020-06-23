/* eslint-disable no-undef */
import test from 'ava'
import { DOM, mount } from '../src'

const { div, ul, li } = DOM

test.beforeEach(t => {
  t.context = {
    text: 'hello world',
    data: {
      todos: [{ title: 'My first todo', completed: false }]
    }
  }
})

test('Should create a div element with text', t => {
  const { text } = t.context
  document.body.appendChild(div({}, text))
  t.truthy(document.querySelector('div').textContent, text)
})

test('Should mount app element', t => {
  const App = div({ className: 'app' }, 'I am the app')
  mount(document.body, App)
  t.truthy(document.body.querySelector('.app'), 'App has mounted')
})

test('Should create a todo list', t => {
  const { todos } = t.context.data
  const TodoList = ul({ id: 'todo-list'}, todos.map(t => li({}, t.title)))

  t.is(TodoList.firstElementChild.textContent, todos[0].title)
  mount(document.body, TodoList)

  const todosEl = document.getElementById('todo-list')
  t.is(todosEl.firstElementChild.textContent, todos[0].title)
})
