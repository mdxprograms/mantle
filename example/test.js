import { DOM } from "../src";

const { main, div, button, input, ul, li } = DOM;

let data = {
  person: "",
  people: [{ name: "Josh" }, { name: "Annie" }]
};

const setPerson = e => {
  data.person = e.target.value;
};

const addPerson = () => {
  const app = document.getElementById("app");
  const ul = app.querySelector("ul");
  data.people = [...data.people, { name: data.person }];
  app.replaceChild(peopleList(data.people), ul);
};

const removePerson = e => {
  const app = document.getElementById("app");
  const ul = app.querySelector("ul");
  data.people = data.people.filter(p => p.name !== e.target.textContent)
  app.replaceChild(peopleList(data.people), ul);
}

const peopleList = people =>
  ul(
    {},
    data.people.map(p => li({ onclick: removePerson }, p.name))
  );

const App = data =>
  main({ id: "app" }, [
    div({}, [
      input({ oninput: setPerson }, data.person),
      button({ onclick: addPerson }, "Add")
    ]),
    peopleList(data.people)
  ]);

document.body.appendChild(App(data));
