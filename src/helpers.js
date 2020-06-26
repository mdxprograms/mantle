/**
 * @name compose
 * @description Compose multiple changes on a data source
 * @example
 * compose(
 *   setProp('disabled', true),
 *   setStyle('background', '#ddd')
 * )(el)
 * @param  {Function[]} fns
 * @param  {any} x
 * @return {any}
 */
export const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x)

/**
 * @name setProp
 * @description Set a property's value on a curried element
 * @example
 * setProp('disabled', true)(el)
 * @param  {String} k
 * @param  {any} v
 * @param  {HTMLElement} el
 * @return {HTMLElement}
 */
export const setProp = (k, v) => el => {
  el.setAttribute(k, v)
  return el
}

/**
 * @name getProp
 * @description Returns a value for a curried elements property
 * @example
 * getProp('src')(el)
 * @param  {String} k
 * @param {HTMLElement} el
 * @return {any}
 */
export const getProp = k => el => el.hasAttribute(k) && el.getAttribute(k)

/**
 * @name setStyle
 * @description Ability to set inline styles on a curried element
 * @param  {Array[]} styles
 * @param  {HTMLElement} el
 * @example
 * setStyle([
 *   ["background", "#f7f7f7"],
 *   ["color", "#444"]
 * ])(el)
 * @return  {HTMLElement}
 */
export const setStyle = styles => el => {
  styles.forEach(([k, v]) => {
    el.style[k] = v
  })
  return el
}
