import nanobus from 'nanobus'

// const bus = nanobus()

// export const dispatch = (evtName, val) => bus.emit(evtName, val)

// export const on = (evtName, cb) => bus.on(evtName, cb)

export let Bus = {}

export const dispatch = (evtName, val) => {
  if (!Bus[evtName]) {
    if (String(val)) {
      Bus = { ...Bus, [`${evtName}`]: () => val }
    } else {
      Bus = { ...Bus, [`${evtName}`]: val }
    }
  }

  return String(val) ? Bus[evtName](val) : val()
}

export const on = (evtName, cb) => {
  if (!Bus[evtName]) {
    Bus = { ...Bus, [`${evtName}`]: cb }
    console.log(Bus)
    return Bus[evtName]
  }

  return cb
}
