import React from 'react'

/**
 * Merges two or more refs together providing a single interface to set their value
 * @param {(*|React.MutableRefObject<null>)[]} refs
 * @returns {MutableRefObject} - a new ref, which translates all changes to {refs}
 *
 * @see {@link mergeRefs} a version without buit-in memoization
 * @see https://github.com/theKashey/use-callback-ref#usemergerefs
 * @src https://github.com/theKashey/use-callback-ref/blob/master/src/useMergeRef.ts
 * @example
 * const Component = React.forwardRef((props, ref) => {
 *   const ownRef = useRef();
 *   const domRef = useMergeRefs([ref, ownRef]); // 👈 merge together
 *   return <div ref={domRef}>...</div>
 * }
 */
export default function useMergeRefs(refs) {
  // console.log('useMergeRefs.js::[19] ref', refs)
  const mergedRef = React.useCallback((node) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref && ref.current) {
        /* eslint-disable no-param-reassign */
        ref.current = node
      }
    })
  }, refs)

  return mergedRef
}
