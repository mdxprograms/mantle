import { DOM, mount, currentState } from "../src";

const { article, main, div, button, input, ul, li, span } = DOM;

const Root = () => document.getElementById("app");

let initialState = {
  person: "leroy",
  people: [],
  comments: {
    current: "",
    count: 0,
    all: [],
  },
};

const dispatch = (event, detail) => new CustomEvent(event, detail);

const personInput = (person) =>
  input(
    {
      "prop:person": person,
      onkeyup: function (e) {
        e.target.dispatchEvent(
          dispatch("prop:person", { detail: e.target.value })
        );
      },
    },
    ""
  );

const container = (state) =>
  div({ className: state.person }, personInput(state.person));

const App = (state) => main({ id: "app-root" }, [container(state)]);

mount(Root(), App, initialState);
