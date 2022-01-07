import React from 'react'
import Modal from 'react-responsive-modal'

function ModalV3(
  {
    isOpen: propsIsOpen,
    onClose: tellParentToClose,
    children,
    renderButton = (modal) => {},
    // renderContent = (modal) => {},
    center = true,
    ...modalProps
  },
  forwardRef,
) {
  const [stateIsOpen, setStateOpen] = React.useState(false)
  const isControlled = typeof propsIsOpen === 'boolean'
  const isOpen = isControlled ? propsIsOpen : stateIsOpen

  const onOpenModal = () => setStateOpen(true)
  const onCloseModal = React.useCallback(() => {
    if (!isControlled) {
      setStateOpen(false)
    } else {
      tellParentToClose()
    }
  }, [isControlled, tellParentToClose])

  return (
    <>
      {!isControlled && renderButton({ setOpen: () => setStateOpen(true) })}
      <Modal open={isOpen} onClose={onCloseModal} center {...modalProps}>
        {children}
      </Modal>
    </>
  )
}

export default React.forwardRef(ModalV3)
