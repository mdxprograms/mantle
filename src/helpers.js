export const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x)

export const changeProp = (k, v) => el => {
  el.setAttribute(k, v)
  return el
}

export const getProp = k => el => el.getAttribute(k)

export const setStyle = styles => el => {
  styles.forEach(([k, v]) => {
    el.style[k] = v
  })
  return el
}
