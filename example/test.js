import { DOM } from "../src";

const { main, div, button, input, ul, li } = DOM;

const Root = () => document.getElementById("app");

const update = () => Root().replaceWith(App(data));

let data = {
  person: "",
  people: [{ name: "Josh" }, { name: "Annie" }]
};

const addPersonBtn = button(
  {
    onclick: () => {
      data.people.push({ name: data.person });
      data.person = "";
      update();
    }
  },
  "Add"
);

const personInput = person =>
  input({ onkeyup: e => (data.person = e.target.value) }, person);

const removePerson = e => {
  data.people = data.people.filter(p => p.name !== e.target.textContent);
};

const peopleList = people =>
  ul(
    {},
    data.people.map(p => li({ onclick: removePerson }, p.name))
  );

const App = data =>
  main({ id: "app" }, [
    div({}, [personInput(data.person), addPersonBtn]),
    peopleList(data.people)
  ]);

Root().appendChild(App(data));
