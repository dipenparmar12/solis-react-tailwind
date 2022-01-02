import React from 'react'
import Dialog, { DialogContent, DialogOverlay } from '@reach/dialog'
import { useTransition, animated } from 'react-spring'
import '@reach/dialog/styles.css'
import classNames from 'classnames'

function ModalV2({
  isOpen: propsIsOpen,
  onClose: tellParentToClose,
  renderButton = (modal) => {},
  renderContent = (modal) => {},
  className,
  children,
  size: propsSize,
}) {
  const [stateIsOpen, setStateOpen] = React.useState(false)
  const isControlled = typeof propsIsOpen === 'boolean'
  const isOpen = isControlled ? propsIsOpen : stateIsOpen

  const $modalRef = React.useRef()
  const $clickableOverlayRef = React.useRef()

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full']

  const closeModal = React.useCallback(() => {
    if (!isControlled) {
      setStateOpen(false)
    } else {
      tellParentToClose()
    }
  }, [isControlled, tellParentToClose])

  return (
    <div style={{ zIndex: 10 }}>
      {!isControlled && renderButton({ open: () => setStateOpen(true) })}

      <DialogOverlay
        style={{ zIndex: 10 }}
        isOpen={isOpen}
        onDismiss={closeModal}
        className="bg-black/50"
      >
        {/* Sizes */}
        <DialogContent
          aria-label="Modal"
          className={classNames('', 'p-0', className)}
          style={{ boxShadow: '0px 10px 50px hsla(0, 0%, 0%, 0.1)' }}
        >
          {children || (renderContent && renderContent({ close: closeModal }))}
        </DialogContent>
      </DialogOverlay>
    </div>
  )
}

export default ModalV2
