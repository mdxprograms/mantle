import { DOM, mount, dispatch } from "../src";
import { notify } from "./notifications";

const { main, div, input, button, ul, li } = DOM;

const Root = document.getElementById("app");

// Ideas and todos
// @TODO: Use global listener options
// dispatch("globalname:function", val);
// map second portion of colon to function?
// const actionListeners = {
//   validatePerson: (val) => val.length > 0
// };

// const Mantle = {
//   validateInput(val) {
//     if (val.length < 2) {

//     }
//   }
// }

const personInput = input({
  onkeyup(e) {
    dispatch("Mantle:validateInput", e.target.value); 
  },
  "person:added"() {
    this.value = "";
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
    this.appendChild(
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
