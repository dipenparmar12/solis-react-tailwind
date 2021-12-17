import React from 'react'

/**
 *
 * @param {*} key
 * @param {*} initialValue
 * @returns
 * @src https://usehooks.com/useLocalStorage/
 */
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error also return initialValue
      console.log(error)
      return initialValue
    }
  })
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error)
    }
  }
  return [storedValue, setValue, key]
}

export default useLocalStorage

// const getLocalValue = (key, initState) => {
//   try {
//     const localValue = JSON.parse(localStorage.getItem(key) || null) || null
//     if (localValue) return localValue
//     if (initState instanceof Function) return initState()
//     return initState
//   } catch (error) {
//     console.log('useLocalStorageState.js::[10] error', error)
//     return null
//   }
// }

// const useLocalStorage = (key, initState = null) => {
//   const [value, setValue] = React.useState(() => getLocalValue(key, initState))
//   React.useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value))
//   }, [key, value])
//   return [value, setValue, key]
// }
