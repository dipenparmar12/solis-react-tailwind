import React from 'react'
import classNames from 'classnames'
import useToggle from '@/hooks/useToggle'
import useMergeRefs from '@/hooks/useMergeRefsV2'

/**
 * TODO::Toggle determine Hight size and animation on click
 * @param {*} param0
 * @param {*} ref
 * @returns
 */
function Accordion(
  {
    renderButton,
    buttonAs: AccordingHeading = 'button',
    containerAs: Content = 'div',
    title,
    children,
    initialIsOpen = false,
  },
  ref,
) {
  const [isOpen, { toggle, on, off }] = useToggle(initialIsOpen)
  const internalRef = React.useRef()

  // React.useEffect(() => {
  //   console.log('Accordion.js::[31]', internalRef.current?.scrollHeight)
  // }, [internalRef])

  return (
    <div className="">
      {renderButton ? (
        renderButton({ toggle, on, off, isOpen })
      ) : (
        <AccordingHeading type="button" onClick={toggle} aria-expanded={isOpen}>
          {title}
        </AccordingHeading>
      )}

      <Content
        className={classNames([isOpen ? 'block' : 'hidden'])}
        ref={useMergeRefs(internalRef, ref)}
      >
        {children}
      </Content>
    </div>
  )
}

export default React.forwardRef(Accordion)
