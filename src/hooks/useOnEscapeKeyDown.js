import { useEffect } from 'react'

/**
 * Fire event on escape key press
 * @param {Boolean} isListening
 * @param {Function} onEscapeKeyDown
 * @src https://github.com/oldboyxx/jira_clone/blob/master/client/src/shared/hooks/onEscapeKeyDown.js
 */
const useOnEscapeKeyDown = (isListening, onEscapeKeyDown) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.keyCode === 27 ||
        event.key === 'Escape' ||
        event.key === 'Esc'
      ) {
        onEscapeKeyDown?.()
      }
    }

    if (isListening) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isListening, onEscapeKeyDown])
}

export default useOnEscapeKeyDown
