export const dispatch = (evtName, val) =>
  document.dispatchEvent(
    new CustomEvent(evtName, { bubbles: true, detail: val })
  );
