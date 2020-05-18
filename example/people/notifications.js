import { DOM } from "../../src";
import { personAdded, personRemoved } from "./events";

const { div } = DOM;

const notifyEvent = (ctx, msg) => {
  ctx.textContent = msg;
  setTimeout(() => (ctx.textContent = "Notifications"), 2000);
};

export const notify = div(
  {
    className: "notifications",
    [personAdded]: (val) => notifyEvent(notify, `${val} was added`),
    [personRemoved]: (li) =>
      notifyEvent(notify, `${li.textContent} was removed.`),
  },
  "Notifications"
);
