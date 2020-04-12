import { DOM, mount, State } from "../src";

const { article, main, div, button, input, ul, li, span } = DOM;

const Root = () => document.getElementById("app");

const update = () =>
  Root()
    .querySelector("#app-root")
    .replaceWith(App(state));

const state = new State({
  person: "",
  people: [],
  comments: {
    current: "",
    count: 0,
    all: []
  }
});

const handlePerson = e => state.update("person", e.target.value);
const personInput = person => input({ onkeyup: handlePerson }, person);

const handleAddPerson = () =>
  state.update("people", state.get("people").concat(state.get("person")));
const addPersonBtn = button(
  {
    onclick: handleAddPerson
  },
  "Add"
);

const handleRemovePerson = e => {
  state.update(
    "people",
    state
      .get("people")
      .filter(
        p => p.name !== e.target.parentElement.querySelector("span").textContent
      )
  );
};
const removePersonBtn = () =>
  button(
    {
      className: "f6 link dim br1 ph3 pv2 dib black bg-dark-red pointer",
      onclick: handleRemovePerson
    },
    "Delete?"
  );

const handleNewComment = e => {
  if (e.target.value.length >= 2) {
    state.update("comments.current", e.target.value);
    state.update("comments.count", state.get("comments.count") + 1);
  }
};

const handleSaveComment = () => {
  const allComments = state.get("comments.all");
  allComments.push(state.get("comments.current"));
  state.update("comments.all", allComments);
};

const peopleList = people =>
  ul(
    { className: "list pl3 pv3 lw6 ba b--light-silver br2" },
    people.map(p =>
      li({}, [span({ className: "mr2" }, p.name), removePersonBtn()])
    )
  );

const App = state =>
  main({ id: "app-root" }, [
    div({}, [personInput(state.get("person")), addPersonBtn]),
    input({ onkeyup: handleNewComment }),
    input({ value: state.get("comments.count") }),
    button({ onclick: handleSaveComment }, "Save Comment"),
    article(
      { className: "pa3 pa5-ns" },
      state.get("people").length > 0 ? [peopleList(state.get("people"))] : []
    )
  ]);

mount(Root(), App(state));
