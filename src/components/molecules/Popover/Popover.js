import Tippy from '@tippyjs/react'
import React from 'react'

const PopoverContainer = ({ children, ...rest }) => {
  return (
    <div
      className={`bg-white border-0 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg shadow-xl ${' '}`}
    >
      {children}
    </div>
  )
}

const Popover = React.forwardRef(({ children, placement, ...rest }, ref) => {
  return (
    <Tippy
      interactive
      content={<PopoverContainer> {children} </PopoverContainer>}
      placement={placement}
      reference={ref}
      trigger="click"
      animation="shift-away"
      className="arrow-light"
      {...rest}
    />
  )
})

export default Popover

Popover.Heading = ({ className, children }) => (
  <>
    <div className={`text-gray-900 p-4 pb-2  font-bold ${className}`}>
      {children}
    </div>
  </>
)

Popover.Body = ({ className, children }) => (
  <>
    <div className={`text-gray-700 font-normal px-4 pb-4 ${className}`}>
      {children}
    </div>
  </>
)
