import { DOM, mount, dispatch } from "../src";

const { main, div, input, button, ul, li } = DOM;

const Root = document.getElementById("app");

const personInput = input({
  onkeyup: (e) => dispatch("person:update", e.target.value),
});

const addPersonBtn = button(
  {
    onclick: () => dispatch("person:added", personInput.value),
  },
  "Add person"
);

const personListEvents = {
  "person:added": (val) =>
    personList.appendChild(
      li({ onclick: (e) => dispatch("person:removed", e.target) }, val)
    ),
  "person:removed": (li) => li.remove(),
};

const personList = ul(personListEvents, li({}, "First child"));

const container = div({ className: "container" }, [
  personInput,
  addPersonBtn,
  personList,
]);

const App = main({ id: "app-root" }, container);

mount(Root, App);
