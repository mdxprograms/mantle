/* eslint-disable no-undef */
import test from 'ava'
import { DOM, mount, dispatch } from '../src'

const { button, h1, p } = DOM

test.beforeEach(t => {
  t.context = {
    text: 'hello world',
    data: {
      todos: [{ title: 'My first todo', completed: false }]
    }
  }
})

test('Should have "on" attached', t => {
  const TestBtn = button({ id: 'test-btn'}, 'Test Button')
    .on({
      click(e) {
        t.is(this.id, 'test-btn')
        t.is(e.target.textContent, this.textContent)
      }
    })
  t.truthy(('on' in TestBtn), 'Has "on" attached')
  t.notThrows(() => TestBtn.click(), 'Button clicked')
})

test('Should have "when" attached', t => {
  const Title = h1({ id: 'title'}, 'Hello Title')
    .when({
      'title:added': self => {
        t.is(self.id, 'title')
      }
    })
  mount(document.body, Title)
  t.notThrows(() => dispatch('title:added'), 'Dispatched event')
})

test('Should receive payload on "when"', t => {
  const Message = p({ id: 'message'}, '')
    .when({
      'message:received': (self, text) => {
        self.textContent = text
      }
    })
  mount(document.body, Message)
  t.notThrows(() => dispatch('message:received', 'The message'), 'Payload sent')
  t.is(Message.textContent, 'The message')
})
