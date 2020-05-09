import { DOM, mount, dispatch } from "../src";

const { main, div, input } = DOM;

const Root = document.getElementById("app");

const personInput = input(
  {
    onkeyup: (e) => dispatch("person:update", e.target.value),
  },
  ""
);

const testOutput = div({
  "person:update": (val) => (testOutput.textContent = val),
});

const container = div({ className: "container" }, [personInput, testOutput]);

const App = main({ id: "app-root" }, container);

mount(Root, App);
