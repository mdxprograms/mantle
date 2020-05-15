import { DOM } from "../src";

const { div } = DOM;

const notifyEvent = (ctx, msg) => {
  ctx.textContent = msg;
  setTimeout(() => (ctx.textContent = "Notifications"), 2000);
};

export const notify = div(
  {
    className: "notifications",
    "person:added"(val) {
      notifyEvent(notify, `${val} was added`);
    },
    "person:removed"(li) {
      notifyEvent(notify, `${li.textContent} was removed.`);
    },
  },
  "Notifications"
);
