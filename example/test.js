import { DOM, mount, dispatch } from "../src";
import { notify } from "./notifications";

const { main, div, input, button, ul, li } = DOM;

const Root = document.getElementById("app");

const personInput = input({
  "person:added"() {
    personInput.value = "";
  },
});

const addPersonBtn = button(
  {
    onclick: () => {
      dispatch("person:added", personInput.value);
    },
  },
  "Add person"
);

const personList = ul({
  "person:added"(val) {
    personList.appendChild(
      li({ onclick: (e) => dispatch("person:removed", e.target) }, val)
    );
  },
  "person:removed"(li) {
    li.remove();
  },
});

const container = div({ className: "container" }, [
  notify,
  personInput,
  addPersonBtn,
  personList,
]);

const App = main({ id: "app-root" }, container);

mount(Root, App);
