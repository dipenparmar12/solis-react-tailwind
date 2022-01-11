/**
 * TODO::REMOVE
 * debounce method for primitives values and functions
 * @param {function|number|string} value
 * @param {number} delay - delay in milliseconds
 */
function debounce(value, delay = 500) {
  let timeoutId = null
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => value.apply(this, args), delay)
  }
}

export default debounce
