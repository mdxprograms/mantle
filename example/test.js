import { DOM, mount, currentState } from "../src";

const { article, main, div, button, input, ul, li, span } = DOM;

const Root = () => document.getElementById("app");

let initialState = {
  person: "",
  people: [],
  comments: {
    current: "",
    count: 0,
    all: [],
  },
};

const handlePerson = (e) => (currentState.person = e.target.value);
const personInput = (person) => input({ onkeyup: handlePerson }, person);

const handleAddPerson = () =>
  (currentState.people = currentState.people.concat(currentState.person));
const addPersonBtn = button(
  {
    onclick: handleAddPerson,
  },
  "Add"
);

const handleRemovePerson = (p) => {
  currentState.people = currentState.people.filter(
    (person) => person.name !== p.name
  );
};
const removePersonBtn = (p) =>
  button(
    {
      className: "f6 link dim br1 ph3 pv2 dib black bg-dark-red pointer",
      onclick: () => handleRemovePerson(p),
    },
    "Delete?"
  );

const handleNewComment = (e) => {
  if (e.target.value.length >= 2) {
    currentState.comments.current = e.target.value;
    currentState.comments.count++;
  }
};

const handleSaveComment = () => {
  const allComments = currentState.comments;
  allComments.push(currentState.comments.current);
  currentState.comments.all = allComments;
};

const peopleList = (people) =>
  ul(
    { className: "list pl3 pv3 lw6 ba b--light-silver br2" },
    people.map((p) =>
      li({}, [span({ className: "mr2" }, p.name), removePersonBtn(p)])
    )
  );

const App = (state) =>
  main({ id: "app-root" }, [
    div({}, [personInput(currentState.person), addPersonBtn]),
    input({ onkeyup: handleNewComment }),
    input({ value: currentState.comments.count }),
    button({ onclick: handleSaveComment }, "Save Comment"),
    article(
      { className: "pa3 pa5-ns" },
      currentState.people.length > 0 ? [peopleList(currentState.people)] : []
    ),
  ]);

mount(Root(), App, initialState);
