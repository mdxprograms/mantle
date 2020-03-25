import { DOM } from "../src";

const { article, main, div, button, input, ul, li, span } = DOM;

const Root = () => document.getElementById("app");

const update = () => Root().replaceWith(App(data));

let data = {
  person: "",
  people: [{ name: "Josh" }, { name: "Annie" }]
};

const personInput = person =>
  input({ onkeyup: e => (data.person = e.target.value) }, person);

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

const removePersonBtn = name =>
  button(
    {
      className: "f6 link dim br1 ph3 pv2 dib black bg-dark-red pointer",
      onclick: e => {
        data.people = data.people.filter(p => p.name !== name);
        update();
      }
    },
    "Delete?"
  );

const peopleList = people =>
  ul(
    { className: "list pl3 pv3 lw6 ba b--light-silver br2" },
    data.people.map(p =>
      li({}, [span({ className: "mr2" }, p.name), removePersonBtn(p.name)])
    )
  );

const App = data =>
  main({ id: "app" }, [
    div({}, [personInput(data.person), addPersonBtn]),
    article({ className: "pa3 pa5-ns"}, [peopleList(data.people)])
  ]);

Root().appendChild(App(data));
