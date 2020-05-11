import { DOM } from "../src";

const { div } = DOM;

const notifyEvent = (ctx, msg) => {
  ctx.textContent = msg;
  setTimeout(() => (ctx.textContent = "Notifications"), 2000);
};

export const notify = div(
  {
    "person:added"(val) {
      notifyEvent(this, `${val} was added`);
    },
    "person:removed"(li) {
      notifyEvent(this, `${li.textContent} was removed.`);
    },
  },
  "Notifications"
);
