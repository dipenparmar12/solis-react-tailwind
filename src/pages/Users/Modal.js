import useOnEscapeKeyDown from '@/hooks/useOnEscapeKeyDown'
import useOnOutsideClick, {
  useOnOutsideClickWithState,
} from '@/hooks/useonOutsideClick'
import React from 'react'

export default function Modal({
  isOpen: propsIsOpen,
  onClose: tellParentToClose,
  renderButton,
}) {
  const [stateIsOpen, setStateOpen] = React.useState(false)
  const isControlled = typeof propsIsOpen === 'boolean'
  const isOpen = isControlled ? propsIsOpen : stateIsOpen

  const $modalRef = React.useRef()
  const $clickableOverlayRef = React.useRef()

  const closeModal = React.useCallback(() => {
    if (!isControlled) {
      setStateOpen(false)
    } else {
      tellParentToClose()
    }
  }, [isControlled, tellParentToClose])

  useOnOutsideClick($modalRef, isOpen, closeModal, $clickableOverlayRef)
  useOnEscapeKeyDown(isOpen, closeModal)

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
  }, [isOpen])

  return (
    <>
      {!isControlled && renderButton({ open: () => setStateOpen(true) })}
      <div> </div>
    </>
  )
}
