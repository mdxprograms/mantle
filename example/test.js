import { DOM, map, Component } from "../src";

const { main, div, ul, li } = DOM;

let data = {
  people: [{ name: "Josh" }, { name: "Annie" }]
};

let personView = person => li({}, person.name);

let peopleList = people => ul({}, map(personView, people));

let myMain = data =>
  main({ onclick: () => data.people.push({ name: "bob" })}, [div({ className: "inner-div" }, peopleList(data.people))]);

document.body.appendChild(Component(data, myMain));
