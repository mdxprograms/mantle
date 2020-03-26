import { DOM, mount } from "../src";

const { article, main, div, button, input, ul, li, span } = DOM;

const Root = () => document.getElementById("app");

const update = () =>
  Root()
    .querySelector("#app-root")
    .replaceWith(App(state));

const state = {};
Object.defineProperties(state, {
  person: {
    value: "",
    writable: true,
    configurable: true,
    enumerable: true
  },
  people: {
    value: [],
    writable: true,
    configurable: true,
    enumerable: true
  }
});

const handlePerson = e => {
  state.person = e.target.value;
};
const personInput = person => input({ onkeyup: handlePerson }, person);

const handleAddPerson = () => {
  state.people.push({ name: state.person });
  update();
};
const addPersonBtn = button(
  {
    onclick: handleAddPerson
  },
  "Add"
);

const handleRemovePerson = e => {
  state.people = state.people.filter(
    p => p.name !== e.target.parentElement.querySelector("span").textContent
  );
  update();
};
const removePersonBtn = () =>
  button(
    {
      className: "f6 link dim br1 ph3 pv2 dib black bg-dark-red pointer",
      onclick: handleRemovePerson
    },
    "Delete?"
  );

const peopleList = people =>
  ul(
    { className: "list pl3 pv3 lw6 ba b--light-silver br2" },
    people.map(p =>
      li({}, [span({ className: "mr2" }, p.name), removePersonBtn()])
    )
  );

const App = state =>
  main({ id: "app-root" }, [
    div({}, [personInput(state.person), addPersonBtn]),
    article(
      { className: "pa3 pa5-ns" },
      state.people.length > 0 ? [peopleList(state.people)] : []
    )
  ]);

mount(Root(), App(state));
