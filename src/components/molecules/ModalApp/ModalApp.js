import React from 'react'
import ReactDOM from 'react-dom'
import useOutsideClicked from '@/hooks/useOutsideClicked'
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
    document.body.style.overflow = isVisible ? 'hidden' : 'auto'
  }, [isVisible])

  return (
    <>
      <button onClick={() => setIsVisible(!isVisible)}>
        Toggle {isVisible ? ' Y' : ' N'}
      </button>

      <Portal isVisible={isVisible}>
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }}
        >
          <div ref={ref} className="px-3">
            {children}
          </div>
        </div>
      </Portal>

      {/* 
      {isVisible && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${className}`}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          {...props}
        >
          <div ref={ref} className={`bg-white rounded-lg shadow-lg  `}>
            <div className="flex items-center justify-between p-2 px-3">
              <div className="font-semibold">{title}</div>
              <button
                className="text-gray-600"
                onClick={() => {
                  setIsVisible(!isVisible)
                  onClose()
                }}
              >
                <Svg.Close />
              </button>
            </div>

            <div className="w-56 p-2 px-3">{children}</div>
          </div>
        </div>
      )} */}

      {/* <FadeScaleAnim isVisible={isVisible}> */}
      {/* </FadeScaleAnim> */}
    </>
  )
}

// export default React.memo(ModalAppBase)
export default React.forwardRef(ModalAppBase)
