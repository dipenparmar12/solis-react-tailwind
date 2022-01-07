import React from 'react'
import Modal from 'react-responsive-modal'

const ModalContext = React.createContext(null)
export const useModalContext = () => React.useContext(ModalContext)

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

  const onOpen = () => setStateOpen(true)
  const onClose = React.useCallback(() => {
    if (!isControlled) {
      setStateOpen(false)
    } else {
      tellParentToClose()
    }
  }, [isControlled, tellParentToClose])

  const contextValues = React.useMemo(
    () => ({
      isOpen,
      onOpen,
      onClose,
    }),
    [isOpen, onOpen, onClose],
  )

  return (
    <>
      {!isControlled && renderButton({ setOpen: () => setStateOpen(true) })}
      <Modal open={isOpen} onClose={onClose} center {...modalProps}>
        <ModalContext.Provider value={contextValues}>
          {children}
        </ModalContext.Provider>
      </Modal>
    </>
  )
}

export default React.forwardRef(ModalV3)
