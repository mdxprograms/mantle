import { DOM } from "../../src";
import { personAdded, personRemoved } from "./events";

const { div } = DOM;

export const notify = div(
  {
    className: "notifications f2 tc mb5",
  },
  "Notifications"
).when({
  [personAdded]: (self, val) => {
    self.textContent = `${val} was added.`;
    setTimeout(() => (self.textContent = "Notifications"), 1500);
  },
  [personRemoved]: (self, element) => {
    self.textContent = `Element: ${element.nodeName.toLowerCase()} was removed.`;
    setTimeout(() => (self.textContent = "Notifications"), 1500);
  },
});
