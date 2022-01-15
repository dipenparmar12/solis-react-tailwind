/* eslint-disable no-param-reassign */
import * as React from 'react'

export function assignRef(ref, value) {
  if (ref == null) return

  if (typeof ref === 'function') {
    ref(value)
    return
  }

  try {
    // @ts-ignore
    ref.current = value
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`)
  }
}

/**
 * React hook that merges react refs into a single memoized function
 *
 * @example
 * import React from "react";
 * import { useMergeRefs } from `@chakra-ui/hooks`;
 *
 * const Component = React.forwardRef((props, ref) => {
 *   const internalRef = React.useRef();
 *   return <div {...props} ref={useMergeRefs(internalRef, ref)} />;
 * });
 */
export default function useMergeRefs(...refs) {
  return React.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null
    }
    return (node) => {
      refs.forEach((ref) => {
        if (ref) assignRef(ref, node)
      })
    }
  }, refs)
}
