import { DOM, map } from "../src";

const { main, div, ul, li } = DOM;

function watch(data) {
  return new Proxy(data, {
    set(target, property, value) {
      target[property] = value;
      return true;
    }
  });
}

let data = watch({
  people: [{ name: "Josh" }, { name: "Annie" }]
});

let personView = person => li({
  onclick(e) {
    data.people = [...data.people, {name: "Leo"}]
  }
}, person.name);

let peopleList = people => ul({}, map(personView, people));

let myMain = data => main(
  {
    className: "orange"
  },
  [div({ className: "inner-div" }, peopleList(data.people))]
);

document.body.appendChild(myMain(data));
