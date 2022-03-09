import React, { useRef } from 'react'
import Tippy from '@tippyjs/react'
import Popover from '@/components/molecules/Popover/Popover'

/**
 * Badge examples
 * @see
 */
function TooltipExample() {
  const [arrow, setArrow] = React.useState(null)
  const buttonRef = React.useRef()

  return (
    <>
      <h3 className="text-xl ">Tooltip</h3>

      <div className="flex space-x-2 ">
        <button ref={buttonRef} className="btn">
          Popover left
        </button>

        <Popover placement="bottom" ref={buttonRef}>
          <Popover.Heading>Are you sure?</Popover.Heading>
          <Popover.Body>
            And here's some amazing content. It's very engaging. Right?
          </Popover.Body>
        </Popover>
      </div>

      <div className="flex space-x-2 ">
        <Tippy
          content={
            <div className="p-4 bg-white rounded-lg shadow-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
              voluptatum earum incidunt quam! Eius nostrum odit mollitia quae!
              Eligendi voluptates id non expedita mollitia cum debitis
              perspiciatis ipsam, incidunt laboriosam!
            </div>
          }
        >
          <div className="p-4 bg-green-50">Hover me</div>
        </Tippy>
      </div>
    </>
  )
}

export default TooltipExample
