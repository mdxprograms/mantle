import { DOM, mount, State } from "../src";

const { article, main, div, button, input, ul, li, span } = DOM;

const Root = () => document.getElementById("app");

const update = () => Root().querySelector("#app-root").replaceWith(App(state));

const state = new State({
  person: "",
  people: [],
});

const handlePerson = (e) => state.update("person", e.target.value);
const personInput = (person) => input({ onkeyup: handlePerson }, person);

const handleAddPerson = () =>
  state.update("people", state.get("people").concat(state.get("person")));
const addPersonBtn = button(
  {
    onclick: handleAddPerson,
  },
  "Add"
);

const handleRemovePerson = (e) => {
  state.update(
    "people",
    state.get("people").filter(
      (p) => p.name !== e.target.parentElement.querySelector("span").textContent
    )
  );
};
const removePersonBtn = () =>
  button(
    {
      className: "f6 link dim br1 ph3 pv2 dib black bg-dark-red pointer",
      onclick: handleRemovePerson,
    },
    "Delete?"
  );

const peopleList = (people) =>
  ul(
    { className: "list pl3 pv3 lw6 ba b--light-silver br2" },
    people.map((p) =>
      li({}, [span({ className: "mr2" }, p.name), removePersonBtn()])
    )
  );

console.log(state)

const App = (state) =>
  main({ id: "app-root" }, [
    div({}, [personInput(state.get("person")), addPersonBtn]),
    article(
      { className: "pa3 pa5-ns" },
      state.get("people").length > 0 ? [peopleList(state.get("people"))] : []
    ),
  ]);

mount(Root(), App(state));
