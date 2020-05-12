import nanobus from "nanobus";

const bus = nanobus();

export const dispatch = (evtName, val) => bus.emit(evtName, val);

export const on = (evtName, cb) => bus.on(evtName, cb);
