import React from 'react'
import ReactDOM from 'react-dom'
import useOutsideClicked from '@/hooks/useOutsideClickedV2'
import Portal from './Portal'
import Button from '@/components/atoms/Button'
import Svg from '@/components/Svg/Svg'
import FadeScaleAnim from '@/hoc/animation/FadeScaleAnim'

/**
 * Tailwind CSS modal dialog component
 */
const ModalAppBase = (
  {
    title = '',
    body = '',
    onClose = () => {},
    onOpen = () => {},
    children,
    className = '',
    ...props
  },
  forwardRef,
) => {
  const { ref, isVisible, setIsVisible } = useOutsideClicked()

  React.useImperativeHandle(forwardRef, () => ({
    open: () => setIsVisible(true),
    close: () => setIsVisible(false),
    toggle: () => setIsVisible((prev) => !prev),
    isVisible,
  }))

  React.useEffect(() => {
    if (isVisible) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'visible'
    // else document.body.style.overflow = 'unset'
  }, [isVisible])

  return (
    <>
      {/* <button onClick={() => setIsVisible(!isVisible)}>
        Toggle {isVisible ? ' Y' : ' N'}
      </button> */}

      <Portal isVisible={isVisible}>
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto "
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }}
        >
          <div ref={ref} className="px-3 ">
            {children}
          </div>
        </div>
      </Portal>
    </>
  )
}

// export default React.memo(ModalAppBase)
const ModalApp = React.forwardRef(ModalAppBase)
export default ModalApp

export function ModalExampleTEMP() {
  const modalRef = React.useRef(null)
  const modal1Ref = React.useRef(null)

  return (
    <>
      <Button
        size={'sm'}
        onClick={() => {
          modalRef.current?.toggle()
        }}
      >
        Create User
      </Button>

      <ModalApp ref={modalRef} title={'Add user'}>
        <>
          <h1 className="text-2xl">Heading add user </h1>
          <h1 className="text-2xl">Heading add user </h1>
          <ModalApp ref={modal1Ref} title={'Add user'}>
            <>
              <h1 className="text-2xl">Heading add user </h1>
              <div className="">
                <div className="p-3 px-2 py-2 bg-gray-200 border rounded-md shadow-md dark:bg-gray-600 lg:px-4 hover:shadow-lg ">
                  <div>Add user </div>
                </div>
              </div>
            </>
          </ModalApp>

          <div className="">
            <Button
              size={'sm'}
              onClick={() => {
                modal1Ref.current?.toggle()
              }}
            >
              TWO
            </Button>
            {[...Array(10)].map((_, i) => (
              <div
                key={`user__skeleton__${Math.random()}`}
                className="p-3 px-2 py-2 bg-gray-200 border rounded-md shadow-md dark:bg-gray-600 lg:px-4 hover:shadow-lg "
              >
                <div>Add user </div>
              </div>
            ))}
          </div>
        </>
      </ModalApp>
    </>
  )
}
