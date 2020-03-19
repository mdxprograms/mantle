import { DOM, map, subscribe, publish } from "../src";

const { main, div, ul, li } = DOM;

let data = {
  people: [{ name: "Josh" }, { name: "Annie" }]
};

let personView = person =>
  li(
    {
      onclick() {
        publish("people/updated", [
          { people: [...data.people, { name: "bob" }] }
        ])
      }
    },
    person.name
  );

let peopleList = people => ul({}, map(personView, people));

function MainView({ people }) {
  let self = {
    name: "main",
    el: state => main({}, [div({ className: "inner-div" }, peopleList(state))])
  }

  subscribe("people/updated", state => {
    document.body.replaceChild(self.el(people), self.el(state.people));
  });

  return self.el(people);
}

document.body.appendChild(MainView(data));
