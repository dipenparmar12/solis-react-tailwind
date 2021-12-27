import { useEffect, useRef } from 'react'
import isEqual from '@/utils/validation/isEqual'

export const useDeepCompareMemoize = (value) => {
  const valueRef = useRef()

  if (!isEqual(value, valueRef.current)) {
    valueRef.current = value
  }
  return valueRef.current
}

/**
 *
 * @param {*} $ignoredElementRefs
 * @param {*} isListening
 * @param {*} onOutsideClick
 * @param {*} $listeningElementRef
 * @src https://github.com/oldboyxx/jira_clone/blob/master/client/src/shared/hooks/onOutsideClick.js
 */
const useOnOutsideClick = (
  $ignoredElementRefs,
  isListening,
  onOutsideClick,
  $listeningElementRef,
) => {
  const $mouseDownTargetRef = useRef()
  const $ignoredElementRefsMemoized = useDeepCompareMemoize(
    [$ignoredElementRefs].flat(),
  )

  useEffect(() => {
    const handleMouseDown = (event) => {
      $mouseDownTargetRef.current = event.target
    }

    const handleMouseUp = (event) => {
      const isAnyIgnoredElementAncestorOfTarget =
        $ignoredElementRefsMemoized.some(
          ($elementRef) =>
            $elementRef.current.contains($mouseDownTargetRef.current) ||
            $elementRef.current.contains(event.target),
        )
      if (event.button === 0 && !isAnyIgnoredElementAncestorOfTarget) {
        onOutsideClick()
      }
    }

    const $listeningElement = ($listeningElementRef || {}).current || document

    if (isListening) {
      $listeningElement.addEventListener('mousedown', handleMouseDown)
      $listeningElement.addEventListener('mouseup', handleMouseUp)
    }
    return () => {
      $listeningElement.removeEventListener('mousedown', handleMouseDown)
      $listeningElement.removeEventListener('mouseup', handleMouseUp)
    }
  }, [
    $ignoredElementRefsMemoized,
    $listeningElementRef,
    isListening,
    onOutsideClick,
  ])
}

export default useOnOutsideClick
