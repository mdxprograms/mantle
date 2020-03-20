import { DOM, map, subscribe, publish } from "../src";

const { main, div, span, button, input, ul, li } = DOM;

let data = {
  person: new Proxy({ name: "" }, {
    get(obj, prop) {
      return obj[prop] || "";
    },
    set(target, prop, val) {
      target[prop] = val;

      return data;
    },
    name() {
      return data.person.name;
    }
  }),
  people: [{ name: "Josh" }, { name: "Annie" }]
};

const removePerson = e => {
  e.target.parentNode.remove()
}

let personView = person => li({}, [
  span({}, person.name), button({ onclick: removePerson }, "Delete?")
]);

let peopleList = people => ul({}, map(personView, people));

const personInput = person => input(
  { type: "text", placeholder: "New Person", onkeyup: updatePerson },
  person.name
);

const updatePerson = e => {
  data.person.name = e.target.value
  data.people.push(data.person);
};

const MainView = ({ person, people }) => main({}, 
 [personInput(person), div({}, data.person.name), peopleList(people)]
);

document.body.appendChild(MainView(data));
