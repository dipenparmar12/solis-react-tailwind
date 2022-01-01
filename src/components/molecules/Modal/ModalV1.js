import React from 'react'
import useOnEscapeKeyDown from '@/hooks/useOnEscapeKeyDown'
import useOnOutsideClick from '@/hooks/useOnOutsideClick'
import Portal from '@/hoc/Portal'

export default function ModalV1({
  isOpen: propsIsOpen,
  onClose: tellParentToClose,
  renderButton = (modal) => {},
  renderContent = (modal) => {},
  className,
  children,
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

  useOnOutsideClick($modalRef, isOpen, closeModal, $clickableOverlayRef) // move mouse-(up/down) events -> click event (click scrollbar bug)
  useOnEscapeKeyDown(isOpen, closeModal)

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'visible'
    // document.body.style.overflow = isOpen ? 'hidden' : 'auto'
  }, [isOpen])
  return (
    <>
      {!isControlled && renderButton({ open: () => setStateOpen(true) })}

      {isOpen && (
        <Portal>
          <ScrollOverlay>
            <ClickableOverlay clickRef={$clickableOverlayRef}>
              <div
                className={`inline-block relative w-full rounded-sm ${className}`}
                ref={$modalRef}
              >
                {children ||
                  (renderContent && renderContent({ close: closeModal }))}
              </div>
            </ClickableOverlay>
          </ScrollOverlay>
        </Portal>
      )}
    </>
  )
}

const ScrollOverlay = React.forwardRef(({ children }, clickRef) => {
  return (
    <div
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      className="fixed inset-0 z-40 flex items-center justify-center w-full h-full overflow-x-hidden overflow-y-auto"
    >
      {children}
    </div>
  )
})

const ClickableOverlay = React.forwardRef(({ children }, clickRef) => {
  return (
    <>
      <div
        // ref={clickRef}
        className="flex items-center justify-center min-h-full m-auto"
      >
        {children}
      </div>
    </>
  )
})
