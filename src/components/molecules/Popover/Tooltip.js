import Tippy from '@tippyjs/react'
import React from 'react'

/**
 *
 * @see https://github.com/atomiks/tippyjs-react
 * @see https://atomiks.github.io/tippyjs/v6/all-props/#trigger
 */
const ToolTip = React.forwardRef(
  ({ content, children, trigger = 'mouseenter click', ...rest }, ref) => {
    return (
      <>
        <Tippy
          content={content}
          placement={'top'}
          reference={ref}
          trigger={trigger}
          animation="shift-away"
          interactive
          {...rest}
        >
          {children}
        </Tippy>
      </>
    )
  },
)

export default ToolTip

/* 
========================================================
  example
======================================================== 

<ToolTip
    content={
      <div className="p-4 bg-white rounded-lg shadow-lg">
        Approve Expense
      </div>
    }
    placement="bottom"
  >
  Hover me 
</ToolTip>


-------------------
  trigger: 'mouseenter focus',
  // others:
  trigger: 'click',
  trigger: 'focusin',
  trigger: 'mouseenter click',
  // only programmatically trigger it
  trigger: 'manual',
-------------------
  placement: 'top',

  // full list:
  placement: 'top-start',
  placement: 'top-end',

  placement: 'right',
  placement: 'right-start',
  placement: 'right-end',

  placement: 'bottom',
  placement: 'bottom-start',
  placement: 'bottom-end',

  placement: 'left',
  placement: 'left-start',
  placement: 'left-end',

  // choose the side with most space
  placement: 'auto',
  placement: 'auto-start',
  placement: 'auto-end',
*/
