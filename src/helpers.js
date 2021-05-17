/**
 * @name compose
 * @param  {Function[]} fns
 * @param  {any} x
 * @description Compose multiple changes on a data source
 * @example
 * compose(
 *   setProp('disabled', true),
 *   setStyle('background', '#ddd')
 * )(el)
 * @return {any}
 */
export const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x)

/**
 * @name setProp
 * @param  {String} k
 * @param  {any} v
 * @param  {HTMLElement} target
 * @description Set a property's value on a curried element
 * @example
 * setProp('disabled', true)(el)
 * @return {HTMLElement} target
 */
export const setProp = (k, v) => target => {
  target.setAttribute(k, v)
  return target
}

/**
 * @name getProp
 * @param  {String} k
 * @param {HTMLElement} el
 * @description Returns a value for a curried elements property
 * @example
 * getProp('src')(el)
 * @return {any}
 */
export const getProp = k => el => el.hasAttribute(k) && el.getAttribute(k)

/**
 * @name setStyle
 * @param {Array[]} styles
 * @param {HTMLElement} el
 * @description Ability to set inline styles on a curried element
 * @example
 * setStyle([
 *   ["background", "#f7f7f7"],
 *   ["color", "#444"]
 * ])(el)
 * @return {HTMLElement} target
 */
export const setStyle = styles => el => {
  styles.forEach(([k, v]) => {
    el.style.setProperty(k, v)
  })
  return el
}

/**
 * @name append
 * @param  {HTMLElement} element
 * @param {HTMLElement} target
 * @description Appends node to parent target
 * @example
 * append(li({}, 'child'))(ul({}, []))
 * @return {HTMLElement} target
 */
export const append = element => target => {
  target.appendChild(element)
  return target
}

/**
 * @name prepend
 * @param  {HTMLElement} element
 * @param {HTMLElement} target
 * @description Appends node to parent target
 * @example
 * append(li({}, 'child'))(ul({}, []))
 * @return {HTMLElement} target
 */
export const prepend = element => target => {
  target.prepend(element)
  return target
}

/**
 * @name remove
 * @param {HTMLElement} element
 * @param {HTMLElement} target
 * @description Removes a child element
 * @example
 * remove(li({}))(ul({}))
 * @return {HTMLElement} target
 *
 */
export const remove = element => target => {
  target.removeChild(element)
  return target
}

/**
 * @name clear
 * @param {HTMLElement} target
 * @description Removes all child elements
 * @example
 * clear(target)
 * @return {HTMLElement} target
 */
export const clear = target => {
  while (target.children.length > 0) {
    target.firstElementChild.remove()
  }
  return target
}

/**
 * @name setText
 * @param {String} val
 * @param {HTMLElement} target
 * @description Set text content of element
 * @example
 * setText('New text')(el)
 * @return {HTMLElement} target
 */
export const setText = val => target => {
  'textContent' in target
    ? (target.textContent = val)
    : (target.innerText = val)
  return target
}

/**
 * @name getText
 * @param {HTMLElement} target
 * @description Get text content of element
 * @example
 * getText(el)
 * @return {String}
 */
export const getText = target => {
  if ('textContent' in target) {
    return target.textContent
  } else {
    return target.innerText
  }
}

/**
 * @name qs
 * @param {String} selector
 * @param {HTMLElement} target
 * @description Query element in target
 * @example
 * qs('span')(el)
 * @return {HTMLElement}
 */
export const qs = selector => target => target.querySelector(selector)

/**
 * @name qsAll
 * @param {String} selector
 * @param {HTMLElement} target
 * @description Query elements in target
 * @example
 * qsAll('li')(el)
 * @return {NodeList[]}
 */
export const qsAll = selector => target => [
  ...target.querySelectorAll(selector)
]
