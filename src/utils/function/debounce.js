/**
 *
 * @param {*} func
 * @param {*} wait
 * @param {*} immediate
 * @returns {Function} TODO:: cancel function to cancel the debounce
 * @example
 ```
  const debounced = debounce(() => {
   console.log('debounced per second')
  }, 1000)
  debounced()
  debounced()
  debounced()
  // => logs once after 1 second
```
 */
const debounce = (func, wait, immediate = false) => {
  let timeout
  return (...args) => {
    const later = () => {
      timeout = null
      if (!immediate) func(...args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func(...args)
  }
}

export default debounce
