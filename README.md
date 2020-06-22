# Mantle

Goals:

- Easy to write
- Javascript only
- Minimal markup
- Event system over state machine

## Examples

Take a look at the [examples](https://github.com/mdxprograms/mantle/tree/master/examples) for implementation ideas.

## Documentation

Mantle comes with three main concepts:

**DOM**, **mount**, and **dispatch**

### DOM

- Provides html elements as functions with additional features, ie: `div(), a()`
- Each element has two chained functions `on` and `when`
- `on` handles native events on the element itself
    - returns the event callback
    - can target the main element with `on` attached using `this` , ie:

    ```jsx
    a({ href: "/" }, "I am a link")
      .on({
        click(e) {
          e.preventDefault()
          this.style.color = "tomato" // this refers to the actual anchor element
        }
      })
    ```

- `when` encompasses global event listening functions that are triggered using `dispatch`
    - returns `self` and the optional `payload` (`self` referring to the main element `when` is attached to)

        ```jsx
        /**
        * if payload is a person object { name: "Dave" } passed in the dispatch payload
        */
        when({
          "person:added": (self, payload) => self.appendChild(li({}, payload.name))
        })
        ```

### Dispatch

- `dispatch` takes two arguments
    - First argument is the event key. This is best used in a format of prefixing the subject and then the action, ie:

        ```jsx
        dispatch("person:added") // without payload as second argument
        ```

    - Second argument is the payload for the event for global event listeners (`when`) to receive, ie:

        ```jsx
        dispatch("person:added", { name: "Dave", age: 50, city: "Chicago" })

        // an example of an element receiving person:added
        const { ul, li } = DOM;

        const listItem = person => li({}, person.name)

        const PeopleList = ul({}, "")
          .when({
            "person:added": (self, person) => self.appendChild(listItem(person))
          })
        ```

### Mount

- Is the main function that attaches the app element or the outermost element (container) containing all elements used in the app
- `mount` takes two arguments
    - existing dom element to attach to in your html, ie: `document.getElementById("app")`
    - your app element created

    ```jsx
    // ...imports

    const { div, p } = DOM

    const Intro = p({},
      "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
    )

    const App = children => div({ className: "my-app" }, children)

    // Apply App to existing element in the DOM on load with it's children
    mount(document.getElementById("app"), App([Intro]))
    ```

## Development Setup
- `nvm install && nvm use`
- `npm i`
- `npm start`

## UI tests
- `npm run test` (will start cypress)

## Build
- `npm run build`
