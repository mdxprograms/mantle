import { DOM } from "../../src";
import { personAdded, personRemoved } from "./events";

const { div } = DOM;

export const notify = div(
  {
    className: "notifications",
  },
  "Notifications"
).when({
  [personAdded]: (self, val) =>
    setTimeout(() => (self.textContent = `${val} was added.`)),
  [personRemoved]: (self, li) =>
    setTimeout(() => (self.textContent = `${li.textContent} was removed.`)),
});
