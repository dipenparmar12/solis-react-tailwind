/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable no-cond-assign */
import React from 'react'

/**
 * Creates a named context, provider, and hook.
 *
 * @param options create context options
 * @returns {[React.Context<T>, React.Provider<T>, React.Consumer<T>]}
 * @src https://github.com/chakra-ui/chakra-ui/blob/577aeb92dbd6b1e309b973c1864601b936ef20bc/packages/accordion/src/accordion.tsx#L90s
 * @example
 * ```
  const [Provider, Context] = ContextFactory({ name: 'MyContext', strict: true,  })
  
  ```
 */
function ContextFactory(options = {}) {
  const {
    strict = false,
    errorMessage = 'useContext: `context` is undefined. Seems you forgot to wrap component within the Provider',
    name,
  } = options
  const Context = React.createContext(undefined)
  Context.displayName = name

  function useContext() {
    let _a
    const context = React.useContext(Context)

    if (!context && strict) {
      const error = new Error(errorMessage)
      error.name = 'ContextError'
      ;(_a = Error.captureStackTrace) === null || _a === 0
        ? 0
        : _a.call(Error, error, useContext)
      throw error
    }

    return context
  }

  return [Context.Provider, useContext, Context]
}

export default ContextFactory
